import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  tituloNota = "";
  textoNota = "";

  constructor(private dbservice: DbserviceService,  private router: Router) { }

  guardar() {
    this.dbservice.addNota(this.tituloNota,this.textoNota);
    this.dbservice.presentToast("Nota Agregada");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
