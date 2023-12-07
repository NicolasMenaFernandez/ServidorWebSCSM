import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { ModalController, NavController } from '@ionic/angular';
import {EvidenciaPage} from '../evidencia/evidencia.page'


@Component({
  selector: 'app-crudcarros',
  templateUrl: './crudcarros.page.html',
  styleUrls: ['./crudcarros.page.scss'],
})

export class CRUDcarrosPage implements OnInit {
  Patente: string = "";
  Marca: string = "";
  tipo_carro: string = "";
  imagenCarro: File | null = null;
  ID_cuartel: number = 0;
  estado: string="";
  carros!: any[];
  data: any;

  MensajedeError: string="";

  filtroCarros: any[] = []; 

  validaUser: any;

  constructor(private http: HttpClient,private navCtrl: NavController,private modalController: ModalController) { }


  filtroVehiculos(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    this.filtroCarros = this.carros.filter(carros =>
      carros.Patente.toLowerCase().includes(searchTerm) ||
      carros.Marca.toLowerCase().includes(searchTerm) ||
      carros.tipo_carro.toLowerCase().toLowerCase().includes(searchTerm) ||
      carros.ID_cuartel.toString().toLowerCase().includes(searchTerm) ||
      carros.estado.toLowerCase().includes(searchTerm)
    );
    console.log('Resultado del filtro:', this.filtroCarros);
  }

  recargarPagina() {
    location.reload();
  }

  getData(){
    return sessionStorage.getItem('loginstatusAdmin');
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
        this.navCtrl.navigateRoot('/admin-menu');
      }
    }
    else{
      
      this.removeData();
      this.navCtrl.navigateRoot('/adminlogin');
      
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
    if (this.imagenCarro){

      this.metodoPost(this.imagenCarro);

    }

    if (!this.Patente || !this.Marca || !this.tipo_carro || !this.imagenCarro || !this.ID_cuartel|| !this.estado){

      this.MensajedeError = 'Todos los campos son obligatorios';
      return;
  
  
      }

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
        estado: this.estado
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
          this.MensajedeError = '';
        });

        location.reload();

      
    };
  }

  async metodoDelete(Patente: string) {
    this.http
      .delete<any>(`http://127.0.0.1:5000/carros/${Patente}`)
      .subscribe((res) => {
        console.log(res);
        
      });

      location.reload();
  }
    
}
