import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  idNota = "";
  tituloNota = "";
  textoNota = "";

  constructor(private router:Router, private activedroute: ActivatedRoute, private dbservice: DbserviceService) {
    this.activedroute.queryParams.subscribe(param =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.idNota = this.router.getCurrentNavigation().extras.state.idEnviado;
        this.tituloNota = this.router.getCurrentNavigation().extras.state.tituloEnviado;
        this.textoNota = this.router.getCurrentNavigation().extras.state.textoEnviado;
      }
    })
  }

  editar(){
    this.dbservice.updateNota(this.idNota, this.tituloNota,this.textoNota);
    this.dbservice.presentToast("Nota Modificada");
    this.router.navigate(['/home']);
  }

  ngOnInit() {
  }

}
