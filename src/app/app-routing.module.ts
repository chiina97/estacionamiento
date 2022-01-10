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
      loadChildren: () => import('./pages/patente/listarPatentes/listarPatentes.module').then(m => m.EstacionamientoModule),
    },
    {
      path: 'registrarse',
      loadChildren: () => import('./pages/usuario/registrarse/registrarse.module').then(m => m.RegistrarseModule),
    },
    { path: 'login', loadChildren: () => import('./pages/usuario/login/login.module').then(m => m.LoginModule) },
    { path: 'agregarPatente', loadChildren: () => import('./pages/patente/agregar-patente/agregar-patente.module').then(m => m.AgregarPatenteModule) }, 
    //editar patente ruta:
    { path: 'editar/:id', loadChildren: () => import('./pages/patente/editar-patente/editar-patente.module').then(m => m.EditarPatenteModule) },
  { path: 'cuentaCorriente', loadChildren: () => import('./pages/cuenta-corriente/listar-cuenta/cuenta-corriente.module').then(m => m.CuentaCorrienteModule) },
  { path: 'editarCuenta/:id', loadChildren: () => import('./pages/cuenta-corriente/editar-cuenta/editar-cuenta.module').then(m => m.EditarCuentaModule) }, 

  { path: 'historial', loadChildren: () => import('./pages/historial/historial.module').then(m => m.HistorialModule) },
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
