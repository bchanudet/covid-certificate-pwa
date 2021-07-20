import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertRoutingModule } from './cert-routing.module';
import { CertPageComponent } from './cert-page/cert-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nModule } from 'src/app/i18n/i18n.module';


@NgModule({
  declarations: [
    CertPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    I18nModule,
    CertRoutingModule
  ]
})
export class CertModule { }
