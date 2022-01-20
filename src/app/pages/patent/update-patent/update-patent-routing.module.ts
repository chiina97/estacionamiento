import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { UpdatePatentComponent } from './update-patent.component';

const routes: Routes = [
  {
    path: '',
    component: UpdatePatentComponent,
    canActivate: [UserGuard],
    data: { expectedRol: ['user'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePatentRoutingModule {}
