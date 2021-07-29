import { Injectable } from '@angular/core';
import { Observable, of, ReplaySubject } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AVAILABLE_LANGUAGES, DEFAULT_LANGUAGE_ID, Language } from './locales/locales';

@Injectable({
  providedIn: 'root'
})
export class I18nService {

  private currentLanguageSub: ReplaySubject<Language> = new ReplaySubject<Language>(1);

  constructor() {
    this.useLanguage('');
  }

  public useLanguage(id: string){
    if(id === '' || id === 'default'){
      id = DEFAULT_LANGUAGE_ID;
    }

    const found = AVAILABLE_LANGUAGES.find((l) => l.id === id);

    if(found !== undefined){
      this.currentLanguageSub.next(found);
    }
  }

  public get currentLanguage$(): Observable<{id: string, name: string}>{
    return this.currentLanguageSub.pipe(
      map(locale => { return {id: locale.id, name: locale.name}})
    )
  }

  public getTranslation(id: string): Observable<string>{
    return this.currentLanguageSub.pipe(
      map((language) => language.locale.translations),
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
    return this.currentLanguageSub.pipe(
      map((language) => language.locale.dateFormat)
    );
  }

  public getLanguages(): {id: string, name: string}[]{
    return AVAILABLE_LANGUAGES.map((l) => { return {id: l.id, name: l.name}; });
  }

}
