import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  signupView: boolean = false;
  
  user={
    usuario:"",
    password:""
  }
  constructor(private router: Router) { }

  ngOnInit() {
  }

  toggleSignUpView () {
    this.signupView = !this.signupView
  }

  casa(){
    let navigationExtras: NavigationExtras ={
      state:{
        user: this.user 
      }
    };
    this.router.navigate(['/home'],navigationExtras);
  }

}
