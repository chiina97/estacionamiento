import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrentAccountRoutingModule } from './current-account-routing.module';
import {CurrentAccountComponent } from './current-account.component';
import { FormsModule } from '@angular/forms';
import { UpdateAccountComponent } from '../update-account/update-account.component'; //para usar ngModel


@NgModule({
  declarations: [
    CurrentAccountComponent,
    UpdateAccountComponent
  ],
  imports: [
    CommonModule,
    CurrentAccountRoutingModule,
    FormsModule
  ]
})
export class CurrentAccountModule { }
