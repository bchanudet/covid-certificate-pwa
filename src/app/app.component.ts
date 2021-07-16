import { Component } from '@angular/core';
import { ActivationEnd, Event, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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

  constructor(
    private appUpdateSvc: AppUpdateService,
    private router: Router
  ){
    this.hasNewUpdate$ = this.appUpdateSvc.newVersionFound$.pipe(
      filter((v: boolean) => v === true)
    );

    this.displayBack$ = this.router.events.pipe(
      filter((evt: Event) : evt is ActivationEnd => evt instanceof ActivationEnd),
      tap(evt => { console.log(evt)}),
      map((evt: ActivationEnd) => evt.snapshot.url.join('/') !== 'home')
    )
  }

  UpdateApp(){
    this.appUpdateSvc.GetUpdate()
  }

  GoBack(){
    window.history.back();
  }
}
