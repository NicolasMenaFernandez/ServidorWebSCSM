import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CRUDcarrosPage } from './crudcarros.page';

const routes: Routes = [
  {
    path: '',
    component: CRUDcarrosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CRUDcarrosPageRoutingModule {}
