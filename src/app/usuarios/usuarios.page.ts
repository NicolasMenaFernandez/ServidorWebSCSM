import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  mostrarForm: boolean = false; 

  Rut_bombero:string =" ";
  Nombre_bombero: string = "";
  Apellidos_bombero :string="";
  Rango :string="";
  Contrasena_bombero: string="";
  ID_cuartel:string= "";

  MensajedeError: string=""; 

  
  bombero!: any[];

  data: any;

  validaUser: any;

  filtroUser: any[] = [];
  
  constructor(private http: HttpClient,private navCtrl: NavController,private modalController: ModalController) { }



  filtroUsuario(event: any) {
    const searchTerm = event.target.value.toLowerCase();


    this.filtroUser = this.bombero.filter(bomberos =>
      bomberos.Rut_bombero.toLowerCase().includes(searchTerm) ||
      bomberos.Nombre_bombero.toLowerCase().includes(searchTerm) ||
      bomberos.Apellidos_bombero.toLowerCase().includes(searchTerm) ||
      bomberos.Rango.toLowerCase().includes(searchTerm) || 
      bomberos.ID_cuartel.toString().toLowerCase().includes(searchTerm) ||
      bomberos.Contrasena_bombero.toLowerCase().includes(searchTerm)
    
    );
    console.log('Resultado del filtro:', this.filtroUser);
  }


  recargarPagina() {
    location.reload();
  }

  mostrarFormulario() {
    this.mostrarForm = true;
  }

  ocultarFormulario() {
    this.mostrarForm = false;
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
        this.navCtrl.navigateRoot('/usuarios');
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
      .get<any>("http://127.0.0.1:5000/bomberos")
      .subscribe((res) => {
        console.log(res)
        this.bombero = res.bomberos;
      });
  }
  
  async metodoPost() {


      const postData = {
        Rut_bombero: this.Rut_bombero,
        Nombre_bombero: this.Nombre_bombero,
        Apellidos_bombero: this.Apellidos_bombero,
        Rango: this.Rango,
        Contrasena_bombero: this.Contrasena_bombero,
        ID_cuartel: this.ID_cuartel,
      };


      if (!this.Rut_bombero || !this.Nombre_bombero || !this.Apellidos_bombero || !this.Rango || !this.Contrasena_bombero|| !this.ID_cuartel){

        this.MensajedeError = 'Todos los campos son obligatorios';
        return;
  
  
      }

      console.log(postData);

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'  // Ajusta el tipo de contenido según tu API
        })
      };

      this.http
        .post<any>('http://127.0.0.1:5000/bomberos', postData)
        .subscribe((res) => {
          console.log(res);
          this.data = res;
          this.MensajedeError = '';
        });

        location.reload();
  }

 async metodoDelete(Rut_bombero: string) {
  this.http
    .delete<any>(`http://127.0.0.1:5000/bomberos/${Rut_bombero}`)
    .subscribe((res) => {
      console.log(res);
      
    });

    location.reload();
  }


  async metodoPut(Rut_bombero: string) {


    const putData = {
      
      Nombre_bombero: this.Nombre_bombero,
      Apellidos_bombero: this.Apellidos_bombero,
      Rango: this.Rango,
      Contrasena_bombero: this.Contrasena_bombero,
      ID_cuartel: this.ID_cuartel,
    };


    console.log(putData);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'  // Ajusta el tipo de contenido según tu API
      })
    };

    this.http
      .put<any>(`http://127.0.0.1:5000/bomberos/${Rut_bombero}`, putData)
      .subscribe((res) => {
        console.log(res);
        this.data = res;
      },
      (error) => {
        console.error('Error en la solicitud:', error)
      }
      
      );

      location.reload();
}

}
