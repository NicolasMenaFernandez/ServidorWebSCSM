import { HttpClient } from '@angular/common/http';
import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-evidencia',
  templateUrl: './evidencia.page.html',
  styleUrls: ['./evidencia.page.scss'],
})
export class EvidenciaPage implements OnInit {

  @Input() urlImagen: string ='';

  validaUser: any;
  mantenciones!: any[];

  constructor(private http: HttpClient,private navCtrl: NavController,private modalController: ModalController) { }

  cerrarModal() {
    this.modalController.dismiss();
  }


  async ngOnInit() {
  }


}
