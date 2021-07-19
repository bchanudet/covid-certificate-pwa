import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { HomeRoutingModule } from './home-routing.module';
import { HomePageComponent } from './home-page/home-page.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { I18nModule } from 'src/app/i18n/i18n.module';

@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    I18nModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
