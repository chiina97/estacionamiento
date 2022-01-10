import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistorialRoutingModule } from './historial-routing.module';
import { HistorialComponent } from './historial.component';

//paginacion
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    HistorialComponent
  ],
  imports: [
    CommonModule,
    HistorialRoutingModule,
    NgxPaginationModule
  ]
})
export class HistorialModule { }
