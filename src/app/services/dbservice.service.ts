import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notas } from '../classes/notas';



@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  public database: SQLiteObject;

  tablaNotas: string = "CREATE TABLE IF NOT EXISTS notas(id INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(50) NOT NULL, texto TEXT NOT NULL);";
  registro: string = "INSERT or IGNORE INTO notas(id, titulo, texto) VALUES (1, 'Titulo nota', 'Texto de la nota que se quiere mostrar');";
  listaNotas = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
    this.crearBD();
   }

   addNota(titulo,texto){
    let data=[titulo,texto];
    return this.database.executeSql('INSERT INTO notas(titulo,texto) VALUES(?,?)',data)
    .then(res =>{
      this.buscarNotas();
    })

  }

  updateNota(id, titulo, texto){
    let data = [titulo, texto, id];
    return this.database.executeSql('UPDATE notas SET titulo = ?, texto = ? WHERE id = ?', data)
    .then(data2 =>{
      this.buscarNotas();
    })

  }

  deleteNota(id){
    return this.database.executeSql('DELETE FROM notas WHERE id = ?', [id])
    .then(a =>{
      this.buscarNotas();
    })
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'meetu.db',
        location: 'default'

      }).then((db: SQLiteObject) => {
        this.database = db;
        this.presentToast("BD Creada");
        //llamamos a la creación de tablas
        this.crearTablas();
      }).catch(e => this.presentToast(e));
    })
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaNotas, []);
      await this.database.executeSql(this.registro, []);
      this.presentToast("Tabla Creada");
      this.buscarNotas();
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("error creartabla " + e);
    }
  }

  buscarNotas() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM notas', []).then(res => {
      let items: Notas[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id: res.rows.item(i).id,
            titulo: res.rows.item(i).titulo,
            texto: res.rows.item(i).texto
          });
        }
      }
      //this.presentAlert("d");
      this.listaNotas.next(items);
    });
  }

  fetchNotas(): Observable<Notas[]> {
  return this.listaNotas.asObservable();
  }

  async presentToast(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 3000
  });
  toast.present();
  }



}
