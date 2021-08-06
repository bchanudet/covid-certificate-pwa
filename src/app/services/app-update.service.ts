/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { ApplicationRef, Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { BehaviorSubject, concat, fromEvent, interval, Observable } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {

  private hasNewVersionSub : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private canInstallSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private deferredPrompt: any = null;
  private inApp: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  public get newVersionFound$(): Observable<boolean> {
    return this.hasNewVersionSub.asObservable();
  }

  public get canInstallApp$(): Observable<boolean> {
    return this.canInstallSub.asObservable();
  }

  public get updaterEnabled(): boolean{
    return this.updates.isEnabled;
  }

  public get isInApp$(): Observable<boolean>{
    return this.inApp.asObservable();
  }

  constructor(
    appRef: ApplicationRef,
    private updates: SwUpdate
  ) {
    // Check for updates when app is stable or every 6 hours
    const isStable$ = appRef.isStable.pipe(first(isStable => isStable === true));
    const every6h$ = interval(6 * 3600000);
    concat(isStable$, every6h$).pipe(
      filter(() => this.updates.isEnabled)
    ).subscribe(
      () => {
        void this.updates.checkForUpdate();
      }
    );

    // Display warning when update is detected
    this.updates.available.subscribe((evt) => {
      this._onUpdateDetected(evt);
    });

    // Detect if we can add the app to homepage
    fromEvent(window, 'beforeinstallprompt').subscribe(
      (e) => {
        // Avoid calling the install prompt
        e.preventDefault();

        // Store the event to use it later
        this.deferredPrompt = e;

        // signal we can install the app
        this.canInstallSub.next(true);
      }
    );
  }

  private _onUpdateDetected(evt: UpdateAvailableEvent){
    console.log('current version is', evt.current);
    console.log('available version is', evt.available);

    this.hasNewVersionSub.next(true);
  }

  public getUpdate() : void {
    if(!this.hasNewVersionSub.value) {
      return;
    }

    // Activate update then reload the page
    void this.updates.activateUpdate().then(() => document.location.reload());
  }

  public install() : void{
    if(this.deferredPrompt === null){
      return;
    }

    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choice : {"outcome": string}) => {
      if(choice.outcome === 'accepted'){
        this.canInstallSub.next(false);
      }
      // Don't really care about the result, we will put the
      this.deferredPrompt = null;
    })
  }

  public setInApp(value: boolean): void{
    console.log("inapp", value);
    this.inApp.next(value);
  }

}
