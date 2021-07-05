import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRoutingModule } from './list-routing.module';
import { ListPageComponent } from './list-page/list-page.component';
import { CertLineComponent } from './cert-line/cert-line.component';


@NgModule({
  declarations: [
    ListPageComponent,
    CertLineComponent
  ],
  imports: [
    CommonModule,
    ListRoutingModule
  ]
})
export class ListModule { }
