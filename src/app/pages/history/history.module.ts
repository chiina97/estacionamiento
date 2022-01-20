import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HistoryRoutingModule } from './history-routing.module';
import { HistoryComponent } from './history.component';

//paginacion
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [HistoryComponent],
  imports: [CommonModule, HistoryRoutingModule, NgxPaginationModule],
})
export class HistoryModule {}
