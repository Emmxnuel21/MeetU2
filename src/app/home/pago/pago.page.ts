import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  constructor(private menuCtrl: MenuController, private toastController: ToastController,private alertcontroller: AlertController) { }

  ngOnInit() {
  }
  async presentToast(position:'top') {
    const toast = await this.toastController.create({
      message: '¡Pago realizado!',
      duration: 1500,
      position: position
    });
    await toast.present();
  }
  
}