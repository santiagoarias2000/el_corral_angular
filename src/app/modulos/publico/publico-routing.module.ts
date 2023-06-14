import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './menu/menu.component';
import { ErrorComponent } from './error/error.component';
import { AccesoComponent } from './acceso/acceso.component';
import { AcercaComponent } from './acerca/acerca.component';
import { EventoComponent } from './evento/evento.component';
import { CiudadComponent } from './ciudad/ciudad.component';
import { InicioComponent } from './inicio/inicio.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { RegistroComponent } from './registro/registro.component';

const routes: Routes = [
  { path: 'home', component: InicioComponent },
  { path: 'city', component: CiudadComponent },
  { path: 'restaurant', component: RestauranteComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'event', component: EventoComponent },
  { path: 'about', component: AcercaComponent },
  { path: 'login', component: AccesoComponent },
  { path: 'register', component: RegistroComponent },

  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicoRoutingModule {}
