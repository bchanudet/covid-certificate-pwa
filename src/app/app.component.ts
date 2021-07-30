import { Component } from '@angular/core';
import { ActivationEnd, Event, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { I18nService } from './i18n/i18n.service';
import { AppUpdateService } from './services/app-update.service';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-certificate-pwa';

  public hasNewUpdate$ : Observable<boolean>;
  public displayBack$ : Observable<boolean>;
  public displaySettings$ : Observable<boolean>;

  constructor(
    private appUpdateSvc: AppUpdateService,
    private router: Router,
    private i18nSvc: I18nService,
    private SettingsSvc: SettingsService
  ){

    this.hasNewUpdate$ = this.appUpdateSvc.newVersionFound$.pipe(
      filter((v: boolean) => v === true)
    );

    this.displayBack$ = this.router.events.pipe(
      filter((evt: Event) : evt is ActivationEnd => evt instanceof ActivationEnd),
      map((evt: ActivationEnd) => evt.snapshot.url.join('/') !== 'home')
    )

    this.displaySettings$ = this.router.events.pipe(
      filter((evt: Event) : evt is ActivationEnd => evt instanceof ActivationEnd),
      map((evt: ActivationEnd) => evt.snapshot.url.join('/') !== 'settings')
    )


    this.SettingsSvc.currentScheme$.subscribe(
      (newScheme) => {
        if(newScheme === 'default'){
          document.body.className = "";
        }
        else{
          document.body.className = newScheme;
        }
      }
    )
  }

  updateApp(): void{
    this.appUpdateSvc.getUpdate()
  }

  goBack(): void{
    window.history.back();
  }
}
