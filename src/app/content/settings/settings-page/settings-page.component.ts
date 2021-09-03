import { Component } from '@angular/core';
import { AppUpdateService } from 'src/app/services/app-update.service';
import { SettingsService } from 'src/app/services/settings.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent {

  public allLanguages;
  public currentScheme$;
  public currentLanguage$;
  public certificates$;
  public isInApp$;

  public defaultCert;

  constructor(
    private settingsSvc: SettingsService,
    private storageSvc: StorageService,
    private appUpdateSvc: AppUpdateService
  ) {
    this.allLanguages = this.settingsSvc.allLanguages;
    this.currentScheme$ = this.settingsSvc.currentScheme$;
    this.currentLanguage$ = this.settingsSvc.currentLanguage$;
    this.defaultCert = this.settingsSvc.defaultCert;

    this.certificates$ = this.storageSvc.listCertificates();
    this.isInApp$ = this.appUpdateSvc.isInApp$;
  }

  selectNewScheme(scheme: 'default' | 'light' | 'dark' ): void{
    this.settingsSvc.currentScheme = scheme;
  }

  selectNewLanguage(value: string) : void{
    this.settingsSvc.currentLanguage = value;
  }

  selectDefaultCert(value: string) : void{
    this.settingsSvc.defaultCert = value;
  }
}
