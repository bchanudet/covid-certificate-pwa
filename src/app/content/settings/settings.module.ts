import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { SettingsPageComponent } from './settings-page/settings-page.component';
import { I18nModule } from 'src/app/i18n/i18n.module';


@NgModule({
  declarations: [
    SettingsPageComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    I18nModule
  ]
})
export class SettingsModule { }
