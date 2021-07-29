import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { locale } from './locales/locale.fr';
import { AVAILABLE_LOCALES, Locale } from './locales/locales';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private curLocaleSub: ReplaySubject<Locale> = new ReplaySubject<Locale>(1);

  public enabled: boolean = false;


  constructor() {
    if(!environment.production){
      // Use this here to switch to locale
      this.enabled = true;
    }
    this.useLanguage(AVAILABLE_LOCALES[0].id);
  }

  public useLanguage(id: string){
    const found = AVAILABLE_LOCALES.find((l) => l.id === id);

    if(found !== undefined){
      this.curLocaleSub.next(found.locale);
    }
  }

  public getTranslation(id: string): Observable<string>{
    return this.curLocaleSub.pipe(
      map((locale) => locale.translations),
      map(ts => ts.find(t => t.id === id)),
      switchMap((t) => {
        if(t === undefined){
          if(!environment.production){
            console.warn(`No translation for '${id}'`);
          }
          return of('');
        }
        return of(t.html);
      })
    );
  }

  public getDateFormat(): Observable<string>{
    return this.curLocaleSub.pipe(
      map((locale) => locale.dateFormat)
    );
  }

  public getLanguages(): {id: string, name: string}[]{
    return AVAILABLE_LOCALES.map((l) => { return {id: l.id, name: l.name}; });
  }

}
