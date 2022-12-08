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
        path: 'clases',
        loadChildren: () => import('./clases/clases.module').then( m => m.ClasesPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'calendario',
        loadChildren: () => import('./calendario/calendario.module').then( m => m.CalendarioPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'notas',
        loadChildren: () => import('./notas/notas.module').then( m => m.NotasPageModule),
        canActivate: [IngresadoGuard]
      },
      {
        path: 'pago',
        loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule),
        canActivate: [IngresadoGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
