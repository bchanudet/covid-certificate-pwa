import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { I18nService } from '../i18n/i18n.service';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private _schemeSub: ReplaySubject<'default' | 'light' | 'dark'> = new ReplaySubject(1);
  private _langSub: ReplaySubject<string> = new ReplaySubject(1);
  private _defaultCert: BehaviorSubject<string> = new BehaviorSubject<string>("");

  constructor(
    private storageSvc: StorageService,
    private i18nSvc: I18nService
  ) {
    // Read all current settings
    if(this.storageSvc.getPreferenceValue('scheme') !== ""){
      this.currentScheme = this.storageSvc.getPreferenceValue('scheme') as 'default' | 'light' | 'dark';
    }
    else{
      this.currentScheme = 'default';
    }
    if(this.storageSvc.getPreferenceValue('language') !== ""){
      const lang = this.storageSvc.getPreferenceValue('language');
      this._langSub.next(lang);
      this.i18nSvc.useLanguage(lang);
    }
    else{
      this._langSub.next('default');
    }

    this._defaultCert.next(this.storageSvc.getPreferenceValue('defaultCert'));
  }

  // Scheme handling
  public get currentScheme$() : Observable<'default' | 'light' | 'dark'>{
    return this._schemeSub.asObservable();
  }
  public set currentScheme(newScheme: 'default' | 'light' | 'dark'){
    this.storageSvc.setPreferenceValue('scheme', newScheme);
    this._schemeSub.next(newScheme);
  }

  // Language handling
  public get allLanguages(): {id: string, name: string}[] {
    return this.i18nSvc.getLanguages();
  }
  public get currentLanguage$() : Observable<string> {
    return this._langSub.asObservable();
  }
  public set currentLanguage(newLanguage: string){
    this.storageSvc.setPreferenceValue('language', newLanguage);
    this._langSub.next(newLanguage);
    this.i18nSvc.useLanguage(newLanguage);
  }

  // Default cert handling
  public get defaultCert(): string{
    return this._defaultCert.value;
  }
  public set defaultCert(newDefaultCert: string){
    this.storageSvc.setPreferenceValue('defaultCert', newDefaultCert);
    this._defaultCert.next(newDefaultCert);
  }
  public getStandaloneURL(): string{
    return '/list'
  }


}
