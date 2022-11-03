import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupView: boolean = false;
  
  datos:{
    nombre: "",
    contrasena: ""
  }
    
  constructor(private router: Router, private dbservice: DbserviceService, private alertcontroller: AlertController) {}

  ngOnInit() {
  }

  toggleSignUpView () {
    this.signupView = !this.signupView
  }

  async mostrarFormulario() {
    const alert = await this.alertcontroller.create({
      cssClass: 'my-custom-class',
      header: 'Nuevo Usuario!',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre Usuario',
        },
        {
          name: 'contrasena',
          type: 'password',
          placeholder: 'Contraseña Usuario',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          },
        },
        {
          text: 'Registrar',
          handler: (data) => {
            this.registro(data.nombre,data.contrasena)
          },
        },
      ],
    });

    await alert.present();
  }
  
  registro(nombre,contrasena){
    this.dbservice.validarUsuario(nombre).then((data) => {
      if(!data){
        this.dbservice.addUsuario(nombre,contrasena);
        this.dbservice.presentToast("Usuario Agregado");
        console.log(data)
      }else {
        this.dbservice.presentToast("Usuario No Agregado");
      }
    }) 
  }

  ingresar(nombre,contrasena){
    this.dbservice.iniciarSesion(nombre,contrasena).then((data) =>{
      if(!data){
        this.dbservice.presentToast("Usuario o contraseña incorrecta");
      }else{
        let navigationExtras: NavigationExtras ={
          state:{
            datos: this.datos 
          }
        };
        this.router.navigate(['/profile'],navigationExtras);
      }
    })
    
  }
  

  
}
