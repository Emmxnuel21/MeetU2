import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserchatPage } from './userchat.page';

const routes: Routes = [
  {
    path: '',
    component: UserchatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserchatPageRoutingModule {}
