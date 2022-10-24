import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  darkMode: boolean = false;
  constructor(private menu: MenuController, private menuCtrl: MenuController) { }

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
  
  cambio(){
    //const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = this.darkMode
    document.body.classList.toggle('dark');
    }

}
