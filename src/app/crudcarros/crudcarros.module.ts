import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CRUDcarrosPageRoutingModule } from './crudcarros-routing.module';

import { CRUDcarrosPage } from './crudcarros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CRUDcarrosPageRoutingModule
  ],
  declarations: [CRUDcarrosPage]
})
export class CRUDcarrosPageModule {}
