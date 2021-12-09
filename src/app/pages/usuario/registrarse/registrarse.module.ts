import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegistrarseRoutingModule } from './registrarse-routing.module';
import { RegistrarseComponent } from './registrarse.component';

import { FormsModule } from '@angular/forms'; //para usar ngModel



@NgModule({
  declarations: [
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
   RegistrarseRoutingModule,
   FormsModule
  ]
})
export class RegistrarseModule { }
