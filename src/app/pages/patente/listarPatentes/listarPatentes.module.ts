import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstacionamientoRoutingModule } from './listarPatentes-routing.module';
import { EstacionamientoComponent } from './listarPatentes.component';
//paginacion
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    EstacionamientoComponent
  ],
  imports: [
    CommonModule,
    EstacionamientoRoutingModule,
    NgxPaginationModule
  ]
})
export class EstacionamientoModule { }
