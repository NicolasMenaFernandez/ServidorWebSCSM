import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { ModalController, NavController } from '@ionic/angular';
import {EvidenciaPage} from '../evidencia/evidencia.page'

@Component({
  selector: 'app-mantenciones',
  templateUrl: './mantenciones.page.html',
  styleUrls: ['./mantenciones.page.scss'],
})
export class MantencionesPage implements OnInit {

  mostrarForm: boolean = false;

  

  ID_mantencion:Number =0;
  Fecha_mantencion: string = "";
  Tipo_mantencion:string="";
  Desc_mantencion:string="";
  evidencia: File | null = null;
  Patente:string= "";


  MensajedeError: string="";
  
 
  
  mantenciones!: any[];

  mantencion!: any[];

  data: any;

  validaUser: any;

  filtroMantenciones: any[] = []; 

  
  constructor(private http: HttpClient,private navCtrl: NavController,private modalController: ModalController) { }



  filtroMantencion(event: any) {
    const searchTerm = event.target.value.toLowerCase();


    this.filtroMantenciones = this.mantenciones.filter(Mantenciones =>
      Mantenciones.Patente.toLowerCase().includes(searchTerm) ||
      Mantenciones.Desc_mantencion.toLowerCase().includes(searchTerm) ||
      Mantenciones.Fecha_mantencion.toString().toLowerCase().includes(searchTerm)
      
    
    
    );
  }


  recargarPagina() {
    location.reload();
  }


  async mostrarImagen(urlImagen: string) {
    const modal = await this.modalController.create({
      component: EvidenciaPage,
      componentProps: {
        urlImagen: urlImagen
      }
    });
    return await modal.present();
  }


  mostrarFormulario() {
    this.mostrarForm = true;
  }

  ocultarFormulario() {
    this.mostrarForm = false;
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
      .get<any>("http://127.0.0.1:5000/mantenciones")
      .subscribe((res) => {
        console.log(res)
        this.mantenciones = res.Mantenciones;
      });
  }
  

  seleccionarArchivo(event: any) {
    const archivos = event.target.files;
    if (archivos.length > 0) {
      this.evidencia = archivos[0];
    }
  }

  enviarPost() {
    if (this.evidencia){

      this.metodoPost(this.evidencia);

    }

    if (!this.Patente || !this.Fecha_mantencion || !this.Tipo_mantencion || !this.Desc_mantencion || !this.evidencia){

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
        ID_mantencion: this.ID_mantencion,
        Tipo_mantencion: this.Tipo_mantencion,
        Fecha_mantencion: this.Fecha_mantencion,
        Desc_mantencion: this.Desc_mantencion,
        evidencia: base64,
        Patente: this.Patente,
      };

      console.log(postData);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'  // Ajusta el tipo de contenido según tu API
        })
      };

      this.http
        .post<any>('http://127.0.0.1:5000/mantenciones', postData)
        .subscribe((res) => {
          console.log(res);
          this.data = res;
        });

        this.MensajedeError = '';
        location.reload();

        
    };
  }

 async metodoDelete(ID_mantencion: Number) {
  this.http
    .delete<any>(`http://127.0.0.1:5000/mantenciones/${ID_mantencion}`)
    .subscribe((res) => {
      console.log(res);
      
    });
}









}
