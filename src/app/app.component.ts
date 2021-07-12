import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { filter, map, switchMap, switchMapTo, tap } from 'rxjs/operators';
import { AppUpdateService } from './services/app-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'covid-certificate-pwa';

  public hasNewUpdate$ : Observable<boolean>;

  constructor(
    private appUpdateSvc: AppUpdateService
  ){
    this.hasNewUpdate$ = this.appUpdateSvc.newVersionFound$.pipe(
      filter((v: boolean) => v === true)
    );
  }

  UpdateApp(){
    this.appUpdateSvc.GetUpdate()
  }
}
