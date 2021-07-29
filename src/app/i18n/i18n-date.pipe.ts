import { formatDate } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { I18nService } from './i18n.service';

@Pipe({
  name: 'i18nDate'
})
export class I18nDatePipe implements PipeTransform {

  constructor(
    private i18nSvc: I18nService
  ){}

  transform(value: Date|string|number|null|undefined, format = 'mediumDate'): Observable<string>  {
    if (value == null || value === '' || value !== value) return of("");

    return this.i18nSvc.getDateFormat().pipe(
      map(localeFormat => formatDate(value, format, localeFormat))
    );
  }

}
