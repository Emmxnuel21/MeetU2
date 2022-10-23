import { AfterContentChecked, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Geolocation, Geoposition } from '@awesome-cordova-plugins/geolocation/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  
  darkMode: boolean = false;

  constructor(private menu: MenuController, private menuCtrl: MenuController, private geolocation: Geolocation) {}
  
  ngOnInit() {
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

cambio(){
  //const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  this.darkMode = this.darkMode
  document.body.classList.toggle('dark');
  }

}