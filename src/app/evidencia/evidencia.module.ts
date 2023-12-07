import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EvidenciaPageRoutingModule } from './evidencia-routing.module';

import { EvidenciaPage } from './evidencia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EvidenciaPageRoutingModule
  ],
  declarations: [EvidenciaPage]
})
export class EvidenciaPageModule {}
