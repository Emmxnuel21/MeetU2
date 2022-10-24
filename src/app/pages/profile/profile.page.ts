import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  data:any;
  darkMode: boolean = false;

  constructor(private activeroute: ActivatedRoute, private router: Router, private menu: MenuController, private menuCtrl: MenuController) {
  this.activeroute.queryParams.subscribe(params => {
    if (this.router.getCurrentNavigation().extras.state){
      this.data = this.router.getCurrentNavigation().extras.state.user;
      console.log(this.data)
    }
  });
}

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
