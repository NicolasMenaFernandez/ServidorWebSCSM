import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import { catchError } from 'rxjs';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  Rut_bombero: string = '';
  Contrasena_bombero: string = '';
  data: any;

  inicio: string = '';

  serialize(obj: any): string {
    const params = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
      }
    }
    return params.join('&');
  }

  getData(){
    
    if (sessionStorage.getItem('loginerror')){
      return 'error-login';
    }
    else{
      return 'ok-login';
    }

  }

  removeData(){
    sessionStorage.clear();
  }

  constructor(private http: HttpClient,private navCtrl: NavController) { }

  ngOnInit() {

  }



  onLogin (){

    try {

      if (this.Rut_bombero && this.Contrasena_bombero) {
        const body = {
          rut: this.Rut_bombero,
          contrasena: this.Contrasena_bombero,
        };
  
        const url = `http://127.0.0.1:5000/bomber?${this.serialize(body)}`;
        console.log(url);
  
        this.http
        .get<any>(url)
        .subscribe((res) => {
          console.log(res);
          this.data= res;
          console.log(this.data['login'])
          if (this.data['login']){

            this.removeData();
            sessionStorage.setItem("loginstatus",'ok');
            this.navCtrl.navigateRoot('/menu');
  
          }
          else{
            //throw new TypeError("Error");
            //console.log("error");
            this.removeData();
            sessionStorage.setItem("loginerror",'no');
            this.navCtrl.navigateRoot('/login');
            
          }
  
        },
        (error) => {
          console.error(error);
  
          if (error.error && error.error.message) {
            console.log('Mensaje de error del servidor:', error.error.message);
          }
        });     
        
      }

    }

    catch (error){

      console.error(error);

    }



  }
}



