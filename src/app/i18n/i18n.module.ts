import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDirective } from './i18n.directive';



@NgModule({
  declarations: [
    I18nDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    I18nDirective
  ]
})
export class I18nModule { }
