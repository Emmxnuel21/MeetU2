import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-notas',
  templateUrl: './notas.page.html',
  styleUrls: ['./notas.page.scss'],
})
export class NotasPage implements OnInit {
  
  notas: any = [
    {
      titulo: "Titulo de la Nota",
      texto: "Texto de la nota que quiero que salga en el cuerpo del item"
    }
  ]
  constructor(private servicioBD: DbserviceService, public router: Router) { }

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
}
