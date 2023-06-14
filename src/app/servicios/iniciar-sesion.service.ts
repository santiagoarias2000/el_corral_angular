import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import * as miUrl from '../utilidades/dominios/uris';
import { InicioSesion } from '../modelos/inicio-sesion';
import { RespuestaInicioSesion } from '../modelos/respuesta-inicio-sesion';
import { RegistrarUsuario } from '../modelos/registrar-usuario';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { MiSesion } from '../modelos/mi-sesion';

@Injectable({
  providedIn: 'root',
})
export class IniciarSesionService {
  public apiInicioSesion: string = miUrl.API_INICIO_SESION + '/singin';
  public apiRegistrarUsuario: string = miUrl.API_REGISTRAR_USUARIO + '/user';

  public objMiSesion: MiSesion;
  public fotoMiniatura: string;

  constructor(private http: HttpClient, private router: Router) {
    this.objMiSesion = this.inicializarMiSesion();
    this.fotoMiniatura = '';
  }

  //******************Metodos obligatorios*/

  private inicializarMiSesion(): MiSesion {
    return new MiSesion('', '', '', '', '', '');
  }

  //******************Servicios */

  public iniciarSesion(
    objAcceso: InicioSesion
  ): Observable<RespuestaInicioSesion> {
    return this.http.post<RespuestaInicioSesion>(
      this.apiInicioSesion,
      objAcceso
    );
  }

  public registarUsuario(
    objAcceso: RegistrarUsuario
  ): Observable<RespuestaInicioSesion> {
    return this.http.post<RespuestaInicioSesion>(
      this.apiRegistrarUsuario,
      objAcceso
    );
  }
  public salir(): void {
    localStorage.removeItem('foto_usta');
    localStorage.removeItem('token_usta');
    this.router.navigate(['/land/home']);
  }

  /*Logica de negocio */
  public obtenerDatosSesion(): MiSesion {
    return this.objMiSesion;
  }

  public verificarUsuario(): boolean {
    if (localStorage.getItem('token_usta')) {
      try {
        const miTokensito: any = localStorage.getItem('token_usta');
        const objTmp: any = jwtDecode(miTokensito);
        this.objMiSesion.codMiSesion = objTmp.id;
        this.objMiSesion.correoMiSesion = objTmp.correoAcceso;
        this.objMiSesion.rolMiSesion = objTmp.nombreRol;
        this.objMiSesion.ciudadMiSession = objTmp.nombreCiudad;
        this.objMiSesion.nombreMiSession = objTmp.nombreUsuario;
        this.objMiSesion.apellidosMiSession = objTmp.apellidoUsuario;

        this.fotoMiniatura = String(localStorage.getItem('foto_usta'));
        return true;
      } catch (err) {}
    }
    return false;
  }
}
