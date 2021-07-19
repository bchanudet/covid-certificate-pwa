import { Component } from '@angular/core';
import { ActivationEnd, Event, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { I18nService } from './i18n/i18n.service';
import { AppUpdateService } from './services/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-certificate-pwa';

  public hasNewUpdate$ : Observable<boolean>;
  public displayBack$ : Observable<boolean>;
  public displayLang : boolean;

  constructor(
    private appUpdateSvc: AppUpdateService,
    private router: Router,
    private i18nSvc: I18nService
  ){
    this.hasNewUpdate$ = this.appUpdateSvc.newVersionFound$.pipe(
      filter((v: boolean) => v === true)
    );

    this.displayBack$ = this.router.events.pipe(
      filter((evt: Event) : evt is ActivationEnd => evt instanceof ActivationEnd),
      tap(evt => { console.log(evt)}),
      map((evt: ActivationEnd) => evt.snapshot.url.join('/') !== 'home')
    )

    this.displayLang = this.i18nSvc.enabled;
  }

  UpdateApp(){
    this.appUpdateSvc.GetUpdate()
  }

  GoBack(){
    window.history.back();
  }

  SelectLanguage(key: string): void{
    this.i18nSvc.useLanguage(key);
  }
}
