import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { EditarCuentaComponent } from './editar-cuenta.component';

const routes: Routes = [
  { path: '', component: EditarCuentaComponent , 
  canActivate: [UserGuard], data:{expectedRol: ['user'] }
  }
  ];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarCuentaRoutingModule { }
