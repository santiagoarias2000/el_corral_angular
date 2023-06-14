import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicoRoutingModule } from './publico-routing.module';

import { MenuComponent } from './menu/menu.component';
import { ErrorComponent } from './error/error.component';
import { RestauranteComponent } from './restaurante/restaurante.component';
import { EventoComponent } from './evento/evento.component';
import { InicioComponent } from './inicio/inicio.component';
import { AcercaComponent } from './acerca/acerca.component';
import { AccesoComponent } from './acceso/acceso.component';
import { CiudadComponent } from './ciudad/ciudad.component';

import { ContenedorModule } from './../contenedor/contenedor.module';
import { RegistroComponent } from './registro/registro.component';

@NgModule({
  declarations: [
    ErrorComponent,
    MenuComponent,
    RestauranteComponent,
    EventoComponent,
    InicioComponent,
    AcercaComponent,
    AccesoComponent,
    CiudadComponent,
    RegistroComponent,
  ],
  imports: [
    CommonModule,
    PublicoRoutingModule,
    
    FormsModule,
    ToastrModule.forRoot(),
    ContenedorModule
  ],
})
export class PublicoModule {}
