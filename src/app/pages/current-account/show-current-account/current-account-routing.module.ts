import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from 'src/app/guards/user.guard';
import { CurrentAccountComponent } from './current-account.component';

const routes: Routes = [
  { path: '', component: CurrentAccountComponent , 
  canActivate: [UserGuard], data:{expectedRol: ['user'] }
  },
  
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrentAccountRoutingModule { }
