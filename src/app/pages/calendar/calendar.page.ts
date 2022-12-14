import { Component, OnInit } from '@angular/core';
import { MenuController} from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.page.html',
  styleUrls: ['./calendar.page.scss'],
})
export class CalendarPage implements OnInit {

  usuario = JSON.parse(localStorage.getItem('usuarios'));
  
  constructor(private dbservice: DbserviceService,private menu: MenuController, private menuCtrl: MenuController) { }

  ngOnInit() {
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
