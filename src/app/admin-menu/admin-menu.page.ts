import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { NavController } from '@ionic/angular';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-admin-menu',
  templateUrl: './admin-menu.page.html',
  styleUrls: ['./admin-menu.page.scss'],
})
export class AdminMenuPage implements OnInit {

  validaUser: any;

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
  }

 constructor(private http: HttpClient,private navCtrl: NavController,private menuCtrl: MenuController) { }



}
