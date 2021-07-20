import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'i18nDate'
})
export class I18nDatePipe implements PipeTransform {

  constructor(
    private i18nSvc: I18nService
  ){}

  transform(value: Date|string|number, format?: string): string | null;
  transform(value: null|undefined, format?: string): null;
  transform(value: Date|string|number|null|undefined, format?: string): string|null;
  transform(value: Date|string|number|null|undefined, format = 'mediumDate'): string|null  {
    if (value == null || value === '' || value !== value) return null;
    try {
      return formatDate(value, format, this.i18nSvc.getDateFormat());
    } catch (error) {
      throw error;
    }
  }

}
