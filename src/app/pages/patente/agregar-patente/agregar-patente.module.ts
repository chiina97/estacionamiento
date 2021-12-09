import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgregarPatenteRoutingModule } from './agregar-patente-routing.module';
import { AgregarPatenteComponent } from './agregar-patente.component';
import { FormsModule } from '@angular/forms'; //para usar ngModel



@NgModule({
  declarations: [
    AgregarPatenteComponent
  ],
  imports: [
    CommonModule,
    AgregarPatenteRoutingModule,
    FormsModule
  ]
})
export class AgregarPatenteModule { }
