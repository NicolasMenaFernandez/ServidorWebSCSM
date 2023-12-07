import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'carros',
    loadChildren: () => import('./crudcarros/crudcarros.module').then( m => m.CRUDcarrosPageModule)
  },
  {
    path: 'mantenciones',
    loadChildren: () => import('./mantenciones/mantenciones.module').then( m => m.MantencionesPageModule)
  },
  {
    path: 'evidencia',
    loadChildren: () => import('./evidencia/evidencia.module').then( m => m.EvidenciaPageModule)
  },  {
    path: 'usuarios',
    loadChildren: () => import('./usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'adminlogin',
    loadChildren: () => import('./adminlogin/adminlogin.module').then( m => m.AdminloginPageModule)
  },
  {
    path: 'admin-menu',
    loadChildren: () => import('./admin-menu/admin-menu.module').then( m => m.AdminMenuPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
