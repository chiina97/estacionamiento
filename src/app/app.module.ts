import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UiModule } from './ui/ui.module';

import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

//paginacion module
import { NgxPaginationModule } from 'ngx-pagination';
//cookies:
import { CookieService } from 'ngx-cookie-service';
import { interceptorProvider } from './interceptors/user-interceptor.service';
//msj de alert
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { InternationalizationModule } from './internationalization/internationalization.module';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

/**
 * The http loader factory : Loads the files from define path.
 * @param {HttpClient} http
 * @returns {TranslateHttpLoader}
 * @constructor
 */

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, '../assets/locales/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    UiModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    //i18n:
    InternationalizationModule.forRoot({ locale_id: 'en' }), // iniating with default language: en
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [CookieService, interceptorProvider],
  bootstrap: [AppComponent],
  exports: [TranslateModule],
})
export class AppModule {}
