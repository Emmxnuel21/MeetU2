import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { DbserviceService } from 'src/app/services/dbservice.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  usuario = JSON.parse(localStorage.getItem('usuarios'));

  constructor(private dbservice: DbserviceService,private activeroute: ActivatedRoute, private router: Router, private menu: MenuController, private menuCtrl: MenuController, private loading: LoadingController) {}

  ngOnInit() {
  }
    
}