import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';

import { QrcodeComponent } from './qrcode/qrcode.component';
import { CertDetailsComponent } from './cert-details/cert-details.component';
import { I18nModule } from '../i18n/i18n.module';



@NgModule({
  declarations: [
    QrcodeComponent,
    CertDetailsComponent
  ],
  imports: [
    CommonModule,
    QRCodeModule,
    I18nModule
  ],
  exports: [
    QrcodeComponent,
    CertDetailsComponent
  ]
})
export class SharedModule { }
