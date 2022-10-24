import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { ContactosComponent } from './contactos/contactos.component';
import { ReunionesComponent } from './reuniones/reuniones.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'Contactos',
    component: ContactosComponent,
    //Agregar aqui el guard
  },
  {
    path: 'Reuniones',
    component: ReunionesComponent,
    //Agregar aqui el guard
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
