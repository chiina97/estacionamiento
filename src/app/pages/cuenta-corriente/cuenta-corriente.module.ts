import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentaCorrienteRoutingModule } from './cuenta-corriente-routing.module';
import { CuentaCorrienteComponent } from './cuenta-corriente.component';
import { FormsModule } from '@angular/forms';
import { EditarCuentaComponent } from './editar-cuenta/editar-cuenta.component'; //para usar ngModel


@NgModule({
  declarations: [
    CuentaCorrienteComponent,
    EditarCuentaComponent
  ],
  imports: [
    CommonModule,
    CuentaCorrienteRoutingModule,
    FormsModule
  ]
})
export class CuentaCorrienteModule { }
