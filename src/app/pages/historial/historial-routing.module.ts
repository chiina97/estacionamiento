import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { HistorialComponent } from './historial.component';

const routes: Routes = [{ path: '', component: HistorialComponent , canActivate: [UserGuard], data:{expectedRol: ['user']}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialRoutingModule { }
