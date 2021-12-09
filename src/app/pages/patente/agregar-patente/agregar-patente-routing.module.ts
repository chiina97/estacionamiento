import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { AgregarPatenteComponent } from './agregar-patente.component';

const routes: Routes = [
  { path: '', component: AgregarPatenteComponent, 
  canActivate: [UserGuard], data: { expectedRol: ['user'] }}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgregarPatenteRoutingModule { }
