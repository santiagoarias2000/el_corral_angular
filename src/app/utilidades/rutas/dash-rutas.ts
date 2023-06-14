import { Routes } from '@angular/router';
import { ErrorInternoComponent } from 'src/app/modulos/privado/control/error-interno/error-interno.component';

export const RUTAS_DASHBOARD: Routes = [
  {
    path: 'dash',
    loadChildren: () =>
      import('../../modulos/privado/control/control-routing.module').then(
        (m) => m.ControlRoutingModule
      ),
  },
  //este bloque se agrega para cada componete que se vaya a manejar
  {
    path: 'role',
    loadChildren: () =>
      import('../../modulos/privado/rol/rol-routing.module').then(
        (m) => m.RolRoutingModule
      ),
  },
  //Este bloque es para agregar los componentes de producto, las rutas hijas
  {
    path: 'product',
    loadChildren: () =>
      import('../../modulos/privado/producto/producto-routing.module').then(
        (m) => m.ProductoRoutingModule
      ),
  },

  { path: '', redirectTo: 'role', pathMatch: 'full' },
  {path:"**", component: ErrorInternoComponent}
];
