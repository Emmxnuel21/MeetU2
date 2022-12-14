import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from 'src/app/services/dbservice.service';


@Component({
  selector: 'app-reuniones',
  templateUrl: './reuniones.page.html',
  styleUrls: ['./reuniones.page.scss'],
})
export class ReunionesPage implements OnInit {

  notas: any = [
    {
      titulo: "Titulo de la Nota",
      texto: "Texto de la nota que quiero que salga en el cuerpo del item"
    }
  ]
  constructor(private dbservice:DbserviceService, private router: Router) {}

  ngOnInit(){
    //this.servicioBD.presentAlert("1");
    this.dbservice.dbState().subscribe((res) =>{
      //this.servicioBD.presentAlert("2");
      if(res){
        //this.servicioBD.presentAlert("3");
        this.dbservice.fetchNotas().subscribe(item =>{
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
    this.dbservice.presentToast("Hola");
    let navigationextras: NavigationExtras = {
      state : {
        idEnviado : item.id,
        tituloEnviado : item.titulo,
        textoEnviado : item.texto
      }
    }
    this.dbservice.presentToast("Aqui");
    this.router.navigate(['/modificar'],navigationextras);
  }

  eliminar(item) {
    this.dbservice.deleteNota(item.id);
    this.dbservice.presentToast("Nota Eliminada");
  }

}
