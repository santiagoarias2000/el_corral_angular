import { RoleService } from './../../../../servicios/role.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, finalize, map } from 'rxjs';
import { Role } from 'src/app/modelos/role';
import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

@Component({
  selector: 'app-rol-admin',
  templateUrl: './rol-admin.component.html',
  styleUrls: ['./rol-admin.component.css'],
})
export class RolAdminComponent implements OnInit, OnDestroy {
  public tmp: any;
  public cargaFinalizada: boolean;
  public arregloRoles: Role[];
  public subscription: Subscription;

  constructor(private roleService: RoleService) {
    this.arregloRoles = [];
    this.subscription = this.tmp;
    this.cargaFinalizada = false;
  }

  ngOnInit(): void {
    this.obtenerRoles();
  }
  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  public obtenerRoles(): void {
    this.subscription = this.roleService
      .obtenerRoles()
      .pipe(
        map((respuesta: any) => {
          console.log(respuesta);
          this.arregloRoles = respuesta;
        }),
        finalize(() => {
          this.cargaFinalizada = true;
        })
      )
      .subscribe(observadorAny);
  }
}
