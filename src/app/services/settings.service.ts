import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private schemeSub: ReplaySubject<'default' | 'light' | 'dark'> = new ReplaySubject(1);
  private langSub: ReplaySubject<string> = new ReplaySubject(1);

  constructor(
    private storageSvc: StorageService,
    private i18nSvc: I18nService
  ) {
    // Read all current settings
    if(this.storageSvc.GetPreferenceValue('scheme') !== ""){
      this.currentScheme = this.storageSvc.GetPreferenceValue('scheme') as 'default' | 'light' | 'dark';
    }
    else{
      this.currentScheme = 'default';
    }
    if(this.storageSvc.GetPreferenceValue('language') !== ""){
      const lang = this.storageSvc.GetPreferenceValue('language');
      this.langSub.next(lang);
      this.i18nSvc.useLanguage(lang);
    }
    else{
      this.langSub.next('default');
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
    return this.langSub.asObservable();
  }
  public set currentLanguage(newLanguage: string){
    this.storageSvc.SetPreferenceValue('language', newLanguage);
    this.langSub.next(newLanguage);
    this.i18nSvc.useLanguage(newLanguage);
  }


}
