import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UserchatPageRoutingModule } from './userchat-routing.module';

import { UserchatPage } from './userchat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserchatPageRoutingModule
  ],
  declarations: [UserchatPage]
})
export class UserchatPageModule {}
