import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Platform, ToastController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Notas } from '../classes/notas';
import { Usuario } from '../classes/usuario';



@Injectable({
  providedIn: 'root'
})
export class DbserviceService {
  public database: SQLiteObject;

  tablaNotas: string = "CREATE TABLE IF NOT EXISTS notas(id INTEGER PRIMARY KEY autoincrement, titulo VARCHAR(50) NOT NULL, texto TEXT NOT NULL);";
  listaNotas = new BehaviorSubject([]);

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS usuario(id INTEGER PRIMARY KEY autoincrement, nombre VARCHAR(50) NOT NULL, contrasena VARCHAR(50) NOT NULL;";
  listaUsuario = new BehaviorSubject([]);

  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private router: Router, private sqlite: SQLite, private platform: Platform, public toastController: ToastController) {
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

  // CREACION DE USUARIOS

  addUsuario(nombre,contrasena){
    let data=[nombre,contrasena];
    return this.database.executeSql('INSERT INTO usuario(nombre,contrasena,active) VALUES(?,?,?)',data)
    .then(res =>{
      this.buscarUsuario();
    })

  }

  updateUsuario(id, nombre, contrasena){
    let data = [nombre, contrasena, id];
    return this.database.executeSql('UPDATE usuario SET nombre = ?, contrasena = ? WHERE id = ?', data)
    .then(data2 =>{
      this.buscarUsuario();
    })

  }

  deleteUsuario(id){
    return this.database.executeSql('DELETE FROM usuario WHERE id = ?', [id])
    .then(a =>{
      this.buscarUsuario();
    })
  }

  // FIN CREACION DE USUARIOS

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
      await this.database.executeSql(this.tablaUsuario, []);
      this.presentToast("Tablas Creada");
      this.isDbReady.next(true);
    } catch (e) {
      this.presentToast("error crear tabla " + e);
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

  buscarUsuario() {
    //this.presentAlert("a");
    return this.database.executeSql('SELECT * FROM usuario', []).then(res => {
      let items: Usuario[] = [];
      //this.presentAlert("b");
      if (res.rows.length > 0) {
        //this.presentAlert("c");
        for (var i = 0; i < res.rows.length; i++) {
          //this.presentAlert("d");
          items.push({
            id: res.rows.item(i).id,
            nombre: res.rows.item(i).nombre,
            contrasena: res.rows.item(i).contrasena
          });
        }
      }
      //this.presentAlert("d");
      this.listaUsuario.next(items);
    });
  }

  fetchNotas(): Observable<Notas[]> {
  return this.listaNotas.asObservable();
  }

  fetchUsuario(): Observable<Usuario[]> {
  return this.listaUsuario.asObservable();
  }

  async presentToast(mensaje: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 3000
  });
  toast.present();
  }

  validarUsuario(nombre){
    return this.database.executeSql('SELECT COUNT(nombre) as CANTIDAD FROM usuario WHERE nombre = ?', [nombre]).then((data)=>{
      if(data.rows.item(0).CANTIDAD === 0){
        return false;
      }
      return true;
    })
  }

<<<<<<< HEAD
  validarSesion(sesion:any){
    return this.database.executeSql('SELECT nombre FROM usuario WHERE nombre = ? and contrasena = ?',[sesion.nombre,sesion.contrasena])
  }
  
  updateSesionData(sesion:any){
    return this.database.executeSql('UPDATE usuario SET active = ? WHERE nombre = ? ', [sesion.active,sesion.nombre]);
  } 

  getSesionData(sesion:any){
    return this.database.executeSql('SELECT nombre, active FROM usuario WHERE nombre = ? AND contrasena = ?',[sesion.nombre,
      sesion.contrasena])
  }

  login(login:any){
    // Se obtiene si existe alguna data de sesión
    this.getSesionData(login)
    .then((data)=>{ // Si se ejecuto correctamente la consulta
      if(data===undefined){ // Si es undefined es por que no retorno firmas
        this.presentToast("Credenciales Incorrectas");
      }else{ // Si no es undefined es por que el usuario y la password coincidieron con algun registro
        data.active=1; // se cambia el active a 1
        this.updateSesionData(data) // Y se actualiza la sesión
        .then((response)=>{ // Si la sentencia se ejecuto correctamente sin errores
          this.router.navigate(['/profile']); // Y se navega hasta el perfil
          
        });
      }
    })
    .catch((error)=>{
      console.log(error);
    });
  }



  //funcion cuando el usuario cierre sesion
  //cerrarSesion(nombre,contrasena){
    //return this.database.executeSql('SELECT nombre , contrasena FROM usuario WHERE nombre = ? and contrasena = ?',[nombre,contrasena]).then((data)=>{
      //if(data.rows.item(0)){
        //return false
        //this.router.navigate(['login']);
        //alert('Has cerrado sesion');
      //}
    //})
  //}

  //guard para autenticar usuarios
  isAuthenticated(){
    //insertar logica de filtro de permisos
    alert('Has ingresado sin credenciales');
    return true;
    //sii el data rows arroja 1 entonces permite el ingreso a la pagina
    //if//(data.rows.item(1)){//
      //return true
      //this.router.navigate(['profile']);
      //return false
    //}//
  }
=======
  iniciarSesion(nombre,contrasena){
    return this.database.executeSql('SELECT nombre , contrasena FROM usuario WHERE nombre = ? and contrasena = ?',[nombre,contrasena]).then((data)=>{
      if(data.rows.item(0)){
        return false;
      }
      return true;
    })
  }
  //funcion cuando el usuario cierre sesion
  //cerrarSesion(nombre,contrasena){
    //return this.database.executeSql('SELECT nombre , contrasena FROM usuario WHERE nombre = ? and contrasena = ?',[nombre,contrasena]).then((data)=>{
      //if(data.rows.item(0)){
        //return false
        //this.router.navigate(['login']);
        //alert('Has cerrado sesion');
      //}
    //})
  //}

  //guard para autenticar usuarios
  isAuthenticated(){
    //insertar logica de filtro de permisos
    alert('Has ingresado sin credenciales');
    return true;
    //sii el data rows arroja 1 entonces permite el ingreso a la pagina
    //if//(data.rows.item(1)){//
      //return true
      //this.router.navigate(['profile']);
      //return false
    //}//
  }
    
>>>>>>> 8f7dddc823bce4fd5ac2740a48f45b6101616487

}
