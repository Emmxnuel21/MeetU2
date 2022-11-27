import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupView: boolean = false;
  
  login:any={
    Usuario: "",
    Password: ""
  }
  field: string;
    
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

  ingresar(){
    // Se valida que el usuario ingreso todos los datos
    if(this.validateModel(this.login)){
      // Se obtiene si existe alguna data de sesión

    }
    else{
      this.dbservice.presentToast("Falta: "+this.field);
    }
  }

 validateModel(model:any){
  // Recorro todas las entradas que me entrega Object entries y obtengo su clave, valor
  for (var [key, value] of Object.entries(model)) {
    // Si un valor es "" se retornara false y se avisara de lo faltante
    if (value=="") {
      // Se asigna el campo faltante
      this.field=key;
      // Se retorna false
      return false;
    }
  }
  return true;
}

  ir(){
    this.router.navigate(['/profile']);
  }
}
