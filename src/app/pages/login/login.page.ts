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

  
  registro(){
    this.dbservice.validarUsuario(this.login.Usuario).then((data) => {
      if(!data){
        this.dbservice.addUsuario(this.login.Usuario,this.login.Password);
        this.dbservice.presentToast("Usuario Agregado");
        localStorage.setItem('login',JSON.stringify(this.login));
      }else {
        this.dbservice.presentToast("Usuario No Agregado");
      }
    }) 
  }

  ingresar(){
    var usuario = JSON.parse(localStorage.getItem('login'));
    // Se valida que el usuario ingreso todos los datos
    if(this.validateModel(this.login)){
      // Se obtiene si existe alguna data de sesión
      this.dbservice.iniciarSesion(this.login.Usuario,this.login.Password).then((data) => {
        if(!data){
          this.dbservice.presentToast("Usuario No registrado");
        }else {
          if(usuario.Nombre == this.login.Nombre && usuario.Password == this.login.Password){
            localStorage.setItem('ingresado','true');
            this.router.navigate(['/profile']);
          }else{
            this.dbservice.presentToast("Usuario No registrado");
          }        
        }
      }) 
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

}
