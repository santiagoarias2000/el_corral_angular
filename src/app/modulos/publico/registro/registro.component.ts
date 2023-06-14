import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, map, catchError } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

import * as sha512 from 'js-sha512';
import { ToastrService } from 'ngx-toastr';
import { RegistrarUsuario } from './../../../modelos/registrar-usuario';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from './../../../utilidades/observadores/tipo-any';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';
import { RespuestaInicioSesion } from 'src/app/modelos/respuesta-inicio-sesion';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
})
export class RegistroComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objUsuario: RegistrarUsuario;
  public miSuscripcion: Subscription;
  public patronCorreo = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private router: Router,
    public accesoService: IniciarSesionService,
    public toastr: ToastrService
  ) {
    this.objUsuario = new RegistrarUsuario('', '', '', '', '');
    this.miSuscripcion = this.tmp;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public operaciones(formulario: NgForm): void {
    const miHash = sha512.sha512(this.objUsuario.claveAcceso);
    const correo: any = this.objUsuario.correoAcceso;
    const objNuevoUsuario = new RegistrarUsuario( correo, miHash, '', this.objUsuario.nombresUsuario, 
    this.objUsuario.apellidosUsuario );

    this.miSuscripcion = this.accesoService
      .registarUsuario(objNuevoUsuario)
      .pipe(
        map((resultado: RespuestaInicioSesion) => {
          localStorage.setItem('token_usta', resultado.token);
          localStorage.setItem('foto_usta', resultado.base64Usuario);
          this.router.navigate(['/private/dash']);
          mostrarMensaje( 'success', 'Bienvenido al sistema', 'Correcto', this.toastr );
          formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje( 'error', 'Autenticación incorrecta', 'Error', this.toastr );
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
