import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertRoutingModule } from './cert-routing.module';
import { CertPageComponent } from './cert-page/cert-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CertPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CertRoutingModule
  ]
})
export class CertModule { }
