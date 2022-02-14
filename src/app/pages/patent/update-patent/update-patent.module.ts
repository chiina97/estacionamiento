import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdatePatentRoutingModule } from './update-patent-routing.module';
import { UpdatePatentComponent } from './update-patent.component';
import { FormsModule } from '@angular/forms'; //para usar ngModel
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [UpdatePatentComponent],
  imports: [
    CommonModule,
    UpdatePatentRoutingModule,
    FormsModule,
    TranslateModule,
  ],
})
export class UpdatePatentModule {}
