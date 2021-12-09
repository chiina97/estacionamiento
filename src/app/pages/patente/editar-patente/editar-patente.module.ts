import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EditarPatenteRoutingModule } from './editar-patente-routing.module';
import { EditarPatenteComponent } from './editar-patente.component';
import { FormsModule } from '@angular/forms'; //para usar ngModel


@NgModule({
  declarations: [
    EditarPatenteComponent
  ],
  imports: [
    CommonModule,
    EditarPatenteRoutingModule,
    FormsModule
  ]
})
export class EditarPatenteModule { }
