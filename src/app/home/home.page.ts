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
  
  darkMode: boolean = false;

  notas: any = [
    {
      titulo: "Titulo de la Nota",
      texto: "Texto de la nota que quiero que salga en el cuerpo del item"
    }
  ]

  constructor(private router: Router, private menu: MenuController, private menuCtrl: MenuController, private geolocation: Geolocation, private servicioBD: DbserviceService) {}
  //@param $event
  segmentChanged($event){
    console.log($event.detail.value);
    let direction=$event.detail.value
    this.router.navigate(['home/'+direction])
  }

  ngOnInit(){
    //this.servicioBD.presentAlert("1");
    this.servicioBD.dbState().subscribe((res) =>{
      //this.servicioBD.presentAlert("2");
      if(res){
        //this.servicioBD.presentAlert("3");
        this.servicioBD.fetchNotas().subscribe(item =>{
          this.notas = item;
        })
      }
      //this.servicioBD.presentAlert("4");
    });
  }

  getItem($event) {
    const valor = $event.target.value; 
    console.log('valor del control: ' + valor);
  }

  agregar() {
  }

  editar(item) {
    this.servicioBD.presentToast("Hola");
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.titulo,
        textoEnviado : item.texto
      }
    }
    this.servicioBD.presentToast("Aqui");
    this.router.navigate(['/modificar'],navigationextras);
  }

  eliminar(item) {
    this.servicioBD.deleteNota(item.id);
    this.servicioBD.presentToast("Nota Eliminada");
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