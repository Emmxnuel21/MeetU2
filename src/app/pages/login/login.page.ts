import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Usuario } from 'src/app/classes/usuario';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupView: boolean = false;
  
  datos: {
    nombre: "",
    contrasena: ""
  }
    


  constructor(private router: Router, private dbservice: DbserviceService) {}

  ngOnInit() {
  }

  toggleSignUpView () {
    this.signupView = !this.signupView
  }

  registro(nombre,contrasena){
    this.dbservice.validarUsuario(nombre).then((data) => {
      if(!data){
        this.dbservice.addUsuario(this.datos.nombre,this.datos.contrasena);
        this.dbservice.presentToast("Usuario Agregado");
      }else {
        this.dbservice.presentToast("Usuario No Agregado");
      }
    }) 
  }

  ingresar() {
    this.dbservice.validarUsuario(this.datos.nombre).then((data) =>{
      if(!data){
        let navigationExtras: NavigationExtras ={
          state:{
            datos: this.datos 
          }
        };
        this.router.navigate(['/profile'],navigationExtras);
        
      }else{
        this.dbservice.presentToast("Usuario o contraseña incorrecta");
      }
    })
    
  }

  

  

  
}
