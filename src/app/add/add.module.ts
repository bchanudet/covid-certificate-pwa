import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddRoutingModule } from './add-routing.module';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { AddComponent } from './add/add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AddComponent
  ],
  imports: [
    CommonModule,
    AddRoutingModule,
    ZXingScannerModule,
    ReactiveFormsModule
  ]
})
export class AddModule { }
