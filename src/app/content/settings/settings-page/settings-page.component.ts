import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.scss']
})
export class SettingsPageComponent implements OnInit {

  public allLanguages;
  public currentScheme$;
  public currentLanguage$;

  constructor(
    private settingsSvc: SettingsService
  ) {
    this.allLanguages = this.settingsSvc.allLanguages;
    this.currentScheme$ = this.settingsSvc.currentScheme$;
    this.currentLanguage$ = this.settingsSvc.currentLanguage$;
  }

  ngOnInit(): void {
  }

  selectNewScheme(scheme: 'default' | 'light' | 'dark' ){
    this.settingsSvc.currentScheme = scheme;
  }

  selectNewLanguage(value: string){
    this.settingsSvc.currentLanguage = value;
  }
}
