import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ContactosComponent } from './contactos/contactos.component';
import { ReunionesComponent } from './reuniones/reuniones.component';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'Contactos',
    component: ContactosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'Reuniones',
    component: ReunionesComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
