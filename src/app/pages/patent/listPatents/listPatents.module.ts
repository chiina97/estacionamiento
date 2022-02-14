import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListPatentsRoutingModule } from './listPatents-routing.module';
import { ListPatentsComponent } from './listPatents.component';
//paginacion
import { NgxPaginationModule } from 'ngx-pagination';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ListPatentsComponent],
  imports: [
    CommonModule,
    ListPatentsRoutingModule,
    NgxPaginationModule,
    TranslateModule,
  ],
})
export class ListPatentsModule {}
