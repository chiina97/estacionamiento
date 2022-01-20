import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { UpdateAccountComponent } from './update-account.component';

const routes: Routes = [
  {
    path: '',
    component: UpdateAccountComponent,
    canActivate: [UserGuard],
    data: { expectedRol: ['user'] },
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateAccountRoutingModule {}
