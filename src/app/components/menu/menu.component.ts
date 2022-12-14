import { Component, OnInit } from '@angular/core';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  usuario = JSON.parse(localStorage.getItem('usuarios'));

  constructor(private dbservice:DbserviceService) { }

  ngOnInit() {}

  logout(){
    this.dbservice.cerrarSesion()
  }
}
