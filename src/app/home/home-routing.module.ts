import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IngresadoGuard } from '../guards/ingresado.guard';
import { HomePage } from './home.page';



const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children:[
      {
        path: 'contactos',
        loadChildren: () => import('./contactos/contactos.module').then( m => m.ContactosPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'reuniones',
        loadChildren: () => import('./reuniones/reuniones.module').then( m => m.ReunionesPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'inicio',
        loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: '',
        redirectTo: '/home/inicio',
        pathMatch: 'full'
      }
    ]
  },
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
