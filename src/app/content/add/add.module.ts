import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanComponent } from './scan/scan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckComponent } from './check/check.component';
import { SharedModule } from '../../shared/shared.module';
import { I18nModule } from 'src/app/i18n/i18n.module';

@NgModule({
  declarations: [
    ScanComponent,
    CheckComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    ZXingScannerModule,
    SharedModule,
    ReactiveFormsModule,
    I18nModule
  ]
})
export class AddModule { }
