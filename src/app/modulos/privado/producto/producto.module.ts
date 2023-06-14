import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoRoutingModule } from './producto-routing.module';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoListarComponent } from './producto-listar/producto-listar.component';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { ProductoActualizarComponent } from './producto-actualizar/producto-actualizar.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ProductoActualizarConImagenComponent } from './producto-actualizar-con-imagen/producto-actualizar-con-imagen.component';

@NgModule({
  declarations: [
    ProductoCrearComponent,
    ProductoListarComponent,
    ProductoAdminComponent,
    ProductoActualizarComponent,
    ProductoActualizarConImagenComponent,
  ],
  imports: [
    CommonModule,
    ProductoRoutingModule,
    NgxPaginationModule,
    FormsModule,
  ],
})
export class ProductoModule {}
