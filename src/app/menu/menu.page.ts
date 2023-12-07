import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

  Patente: string = "";
  Marca: string = "";
  tipo_carro: string = "";
  imagenCarro: File | null = null;
  ID_cuartel: number = 0;

  filtro: string = "";

  estadoActualizado: string ="";

  carros!: any[];
  data: any;

  validaUser: any;

  constructor(private http: HttpClient,private navCtrl: NavController,private menuCtrl: MenuController,private alertController: AlertController) { }


  recargarPagina() {
    location.reload();
  }


  abrirMenu() {
    this.menuCtrl.open();
  }

  cerrarMenu() {
    this.menuCtrl.close();
  }

  getData(){
    return sessionStorage.getItem('loginstatus');
  }

  removeData(){
    sessionStorage.clear();
  }

  ValidacionUser(){
    if (this.getData()){
      this.validaUser = this.getData();
      //console.log(this.validaUser);
      if (this.validaUser != "ok"){
        this.removeData();
        this.navCtrl.navigateRoot('/login');
      }
    }
    else{
      
      this.removeData();
      this.navCtrl.navigateRoot('/login');
      
    }
    
  }


  

  async ngOnInit() {
    this.ValidacionUser();
    this.http
      .get<any>("http://127.0.0.1:5000/carros")
      .subscribe((res) => {
        console.log(res)
        this.carros = res.carros;
      });
  }

  seleccionarArchivo(event: any) {
    const archivos = event.target.files;
    if (archivos.length > 0) {
      this.imagenCarro = archivos[0];
    }
  }

  enviarPost() {
    if (this.imagenCarro)
      this.metodoPost(this.imagenCarro);

  }

  async metodoPost(archivo: File) {

    console.log(archivo);

    const reader = new FileReader();
    reader.readAsDataURL(archivo);
    reader.onload = () => {
      const base64 = reader.result;
      const postData = {
        Patente: this.Patente,
        Marca: this.Marca,
        tipo_carro: this.tipo_carro,
        imagenCarro: base64,
        ID_cuartel: this.ID_cuartel,
      };

      console.log(postData);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'  // Ajusta el tipo de contenido según tu API
        })
      };

      this.http
        .post<any>('http://127.0.0.1:5000/carros', postData)
        .subscribe((res) => {
          console.log(res);
          this.data = res;
        });
    };
  }

  async metodoDelete(Patente: string) {
    this.http
      .delete<any>(`http://127.0.0.1:5000/carros/${Patente}`)
      .subscribe((res) => {
        console.log(res);
        
      });
  }

  serialize(obj: any): string {
    const params = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return params.join('&');
  }

  async filtroEstado() {
    this.http
      .get<any>(`http://127.0.0.1:5000/carros/${this.filtro}`)
      .subscribe((res) => {
        console.log(res)
        this.carros = res.carros;
      });
  }

  async ActualizarEstado(str_Patente: string) {

    if (this.estadoActualizado){

      location.reload();
     
      const putData = {
      
        estado: this.estadoActualizado,
        Patente: str_Patente
  
      };
  
  
      console.log(putData);
  
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'  // Ajusta el tipo de contenido según tu API
        })
      };
  
      this.http
        .put<any>(`http://127.0.0.1:5000/carrosActualiza/${str_Patente}`, putData)
        .subscribe((res) => {
          console.log(res);
          this.data = res;
        },
        (error) => {
          console.error('Error en la solicitud:', error)
        }
        
        );
    }
    else{
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Debe escoger una opcion de llenado',
        buttons: ['Entendido'],
      });
  
      await alert.present();
    }
    
  }
}
