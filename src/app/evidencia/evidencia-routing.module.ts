import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvidenciaPage } from './evidencia.page';

const routes: Routes = [
  {
    path: '',
    component: EvidenciaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EvidenciaPageRoutingModule {}
