import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './ui/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    // If this path is the 'full' match...
    pathMatch: 'full',
    // ...redirect to this route.
    redirectTo: 'login',
  },
{
  path: '',
  component: LayoutComponent,
  children: [
    // aca van a ir los hijos del layout,de esta forma heredo en header y footer
    {
      path: 'home',
      loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
    },
    {
      path: 'estacionamiento',
      loadChildren: () => import('./pages/patent/listPatents/listPatents.module').then(m => m.ListPatentsModule),
    },
    {
      path: 'registrarse',
      loadChildren: () => import('./pages/user/register/register.module').then(m => m.RegisterModule),
    },
    { path: 'login', loadChildren: () => import('./pages/user/login/login.module').then(m => m.LoginModule) },
    { path: 'agregarPatente', loadChildren: () => import('./pages/patent/create-patent/create-patent.module').then(m => m.CreatePatentModule) }, 
    //editar patente ruta:
    { path: 'editar/:id', loadChildren: () => import('./pages/patent/update-patent/update-patent.module').then(m => m.UpdatePatentModule) },
  { path: 'cuentaCorriente', loadChildren: () => import('./pages/current-account/show-current-account/current-account.module').then(m => m.CurrentAccountModule) },
  { path: 'editarCuenta/:id', loadChildren: () => import('./pages/current-account/update-account/update-account.module').then(m => m.UpdateAccountModule) }, 

  { path: 'historial', loadChildren: () => import('./pages/history/history.module').then(m => m.HistoryModule) },
],
  
},
  
 
 

  
//si pongo una ruta que no existe me redirige igual a login
{
  path: '**',
  // If this path is the 'full' match...
  pathMatch: 'full',
  // ...redirect to this route.
  redirectTo: 'login',
},

 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
