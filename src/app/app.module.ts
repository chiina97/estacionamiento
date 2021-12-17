import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from './ui/ui.module';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

//paginacion module
import {NgxPaginationModule} from 'ngx-pagination';
//cookies:
import { CookieService } from 'ngx-cookie-service';
import { interceptorProvider } from './interceptors/user-interceptor.service';
//msj de alert
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UiModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [CookieService,interceptorProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
