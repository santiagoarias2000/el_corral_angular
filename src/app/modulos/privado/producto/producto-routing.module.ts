import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProductoAdminComponent } from './producto-admin/producto-admin.component';
import { ProductoCrearComponent } from './producto-crear/producto-crear.component';
import { ProductoActualizarComponent } from './producto-actualizar/producto-actualizar.component';
import { ProductoListarComponent } from './producto-listar/producto-listar.component';
import { ProductoActualizarConImagenComponent } from './producto-actualizar-con-imagen/producto-actualizar-con-imagen.component';

const routes: Routes = [
  { path: 'manageproduct', component: ProductoAdminComponent },
  { path: 'addproduct', component: ProductoCrearComponent },
  { path: 'editproduct/:codProducto', component: ProductoActualizarComponent },
  { path: 'listproduct', component: ProductoListarComponent },
  { path: 'editimg/:codProducto', component: ProductoActualizarConImagenComponent },
  { path: '', redirectTo: 'manageproducto', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductoRoutingModule {}
