import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { I18nService } from '../i18n/i18n.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private schemeSub: ReplaySubject<'default' | 'light' | 'dark'> = new ReplaySubject(1);

  constructor(
    private storageSvc: StorageService,
    private i18nSvc: I18nService
  ) {
    // Read all current settings
    if(this.storageSvc.GetPreferenceValue('scheme') !== ""){
      this.currentScheme = this.storageSvc.GetPreferenceValue('scheme') as 'default' | 'light' | 'dark';
    }
    if(this.storageSvc.GetPreferenceValue('language') !== ""){
      this.currentLanguage = this.storageSvc.GetPreferenceValue('language');
    }
  }

  // Scheme handling
  public get currentScheme$() : Observable<'default' | 'light' | 'dark'>{
    return this.schemeSub.asObservable();
  }
  public set currentScheme(newScheme: 'default' | 'light' | 'dark'){
    this.storageSvc.SetPreferenceValue('scheme', newScheme);
    this.schemeSub.next(newScheme);
  }

  // Language handling
  public get allLanguages(): {id: string, name: string}[] {
    return this.i18nSvc.getLanguages();
  }
  public get currentLanguage$() : Observable<string> {
    return this.i18nSvc.currentLanguage$.pipe(
      map(language => language.id)
    )
  }
  public set currentLanguage(newLanguage: string){
    this.i18nSvc.useLanguage(newLanguage);
  }


}
