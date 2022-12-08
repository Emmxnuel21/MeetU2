import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {

  constructor(private servicioBD: DbserviceService, public router: Router) { }

  ngOnInit() {
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


}
