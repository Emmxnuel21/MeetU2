import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';
import { DbserviceService } from '../services/dbservice.service';
import { NavigationExtras, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  usuario = JSON.parse(localStorage.getItem('usuarios'));
  constructor(private dbservice:DbserviceService ,private router: Router, private menu: MenuController, private menuCtrl: MenuController, private geolocation: Geolocation, private servicioBD: DbserviceService) {}


  ngOnInit(){
  }

  ngAfterViewInit(){
    this.geolocationNative();
  }

  geolocationNative(){
  this.geolocation.getCurrentPosition().then((geoposition: Geoposition)=>{
      console.log(geoposition);
  })
}

openFirst() {
  this.menu.enable(true, 'first');
  this.menu.open('first');
}

openEnd() {
  this.menu.open('end');
}

openCustom() {
  this.menu.enable(true, 'custom');
  this.menu.open('custom');
}
toggleMenu(){
  this.menuCtrl.toggle();
}

  
  logout(){
    this.dbservice.cerrarSesion()
  }

}