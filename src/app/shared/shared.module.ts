import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QRCodeModule } from 'angular2-qrcode';

import { QrcodeComponent } from './qrcode/qrcode.component';
import { CertDetailsComponent } from './cert-details/cert-details.component';



@NgModule({
  declarations: [
    QrcodeComponent,
    CertDetailsComponent
  ],
  imports: [
    CommonModule,
    QRCodeModule,
  ],
  exports: [
    QrcodeComponent,
    CertDetailsComponent
  ]
})
export class SharedModule { }
