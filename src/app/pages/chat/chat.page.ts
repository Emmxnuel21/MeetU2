import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  
  characters = [];

  constructor(private http: HttpClient ,private dbservice: DbserviceService,private menu: MenuController, private menuCtrl: MenuController) { }

  ngOnInit() {
    this.http.get<any>('https://rickandmortyapi.com/api/character').subscribe(res => {
      console.log(res);
      this.characters = res.results;
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
