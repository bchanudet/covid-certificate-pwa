import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { ActivationEnd, Event, NavigationEnd, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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
    private SettingsSvc: SettingsService,
    private location: Location
  ){

    this.hasNewUpdate$ = this.appUpdateSvc.newVersionFound$.pipe(
      filter((v: boolean) => v === true)
    );

    this.displayBack$ = this.router.events.pipe(
      filter((evt: Event) : evt is NavigationEnd => evt instanceof NavigationEnd),
      tap((evt: NavigationEnd) => console.log(evt, this.router.getCurrentNavigation())),
      map(() => !!this.router.getCurrentNavigation()?.previousNavigation)
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
    this.location.back();
  }
}
