import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { EstacionamientoComponent } from './listarPatentes.component';

const routes: Routes = [
{ path: '', component: EstacionamientoComponent , 
canActivate: [UserGuard], data:{expectedRol: ['user'] }
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EstacionamientoRoutingModule { }
