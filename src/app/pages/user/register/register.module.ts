import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';

import { FormsModule } from '@angular/forms'; //para usar ngModel

@NgModule({
  declarations: [RegisterComponent],
  imports: [CommonModule, RegisterRoutingModule, FormsModule],
})
export class RegisterModule {}
