import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { I18nDirective } from './i18n.directive';
import { I18nDatePipe } from './i18n-date.pipe';



@NgModule({
  declarations: [
    I18nDirective,
    I18nDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    I18nDirective,
    I18nDatePipe
  ]
})
export class I18nModule { }
