import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [LayoutComponent, HeaderComponent, FooterComponent],
  imports: [CommonModule, RouterModule, TranslateModule],
})
export class UiModule {}
