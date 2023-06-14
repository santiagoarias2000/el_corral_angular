import { Subscription, catchError, map } from 'rxjs';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';

import * as sha512 from 'js-sha512';
import { ToastrService } from 'ngx-toastr';

import { InicioSesion } from './../../../modelos/inicio-sesion';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';
import { IniciarSesionService } from 'src/app/servicios/iniciar-sesion.service';
import { RespuestaInicioSesion } from 'src/app/modelos/respuesta-inicio-sesion';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styleUrls: ['./acceso.component.css'],
})
export class AccesoComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objUsuario: InicioSesion;
  public miSuscripcion: Subscription;
  public patronCorreo = '[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$';

  constructor(
    private router: Router,
    public accesoService: IniciarSesionService,
    public toastr: ToastrService
  ) {
    this.objUsuario = new InicioSesion('', '');
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
    const objIniciar = new InicioSesion(correo, miHash);

    this.miSuscripcion = this.accesoService
      .iniciarSesion(objIniciar)
      .pipe(
        map((resultado: RespuestaInicioSesion) => {
          localStorage.setItem('token_usta', resultado.token);
          localStorage.setItem('foto_usta', resultado.base64Usuario);
          this.router.navigate(['/private/dash']);
          mostrarMensaje(
            'success',
            'Bienvenido al sistema',
            'Correcto',
            this.toastr
          );
          formulario.reset();
          return resultado;
        }),
        catchError((err) => {
          mostrarMensaje(
            'error',
            'Autenticación incorrecta',
            'Error',
            this.toastr
          );
          formulario.reset();
          throw err;
        })
      )
      .subscribe(observadorAny);
  }
}
