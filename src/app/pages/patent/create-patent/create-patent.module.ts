import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatePatentRoutingModule } from './create-patent-routing.module';
import { CreatePatentComponent } from './create-patent.component';
import { FormsModule } from '@angular/forms'; //para usar ngModel
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [CreatePatentComponent],
  imports: [
    CommonModule,
    CreatePatentRoutingModule,
    FormsModule,
    TranslateModule,
  ],
})
export class CreatePatentModule {}
