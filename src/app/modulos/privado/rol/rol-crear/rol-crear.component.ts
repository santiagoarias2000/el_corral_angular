import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
import { Role } from 'src/app/modelos/role';
import { RoleService } from 'src/app/servicios/role.service';
import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-crear',
  templateUrl: './rol-crear.component.html',
  styleUrls: ['./rol-crear.component.css'],
})
export class RolCrearComponent implements OnInit, OnDestroy {
  private tmp: any;
  public objRol: Role;
  public miSuscripcion: Subscription;

  constructor(
    private router: Router,
    public crearRol: RoleService,
    public toastr: ToastrService
  ) {
    this.objRol = new Role('', 0);
    this.miSuscripcion = this.tmp;
  }

  ngOnInit(): void {}
  ngOnDestroy(): void {
    if (this.miSuscripcion) {
      this.miSuscripcion.unsubscribe();
    }
  }

  public operacion(formulario: NgForm): void {
    const nuevoRole = new Role(this.objRol.nombreRol, this.objRol.estadoRol);

    this.miSuscripcion = this.crearRol
      .crearRoles(nuevoRole)
      .pipe(map((resultado) => {
        mostrarMensaje('success', 'Rol Creado', 'Correcto', this.toastr );
        return resultado;
      }), catchError((err)=>{
        mostrarMensaje('error', 'error al crear rol', 'Error', this.toastr);
        formulario.reset();
        throw err;
      })
      ).subscribe(observadorAny)
      ;
  }
}
