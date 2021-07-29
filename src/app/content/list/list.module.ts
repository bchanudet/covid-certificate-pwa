import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { CertLineComponent } from './cert-line/cert-line.component';
import { I18nModule } from 'src/app/i18n/i18n.module';


@NgModule({
  declarations: [
    ListPageComponent,
    CertLineComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule,
    I18nModule
  ]
})
export class ListModule { }
