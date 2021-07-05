import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanComponent } from './scan/scan.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CheckComponent } from './check/check.component';
import { AppModule } from '../app.module';
import { SharedModule } from '../shared/shared.module';

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
    ReactiveFormsModule
  ]
})
export class AddModule { }
