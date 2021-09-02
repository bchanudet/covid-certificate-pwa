import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DCCertificate } from 'src/app/models/certificate';
import { AppUpdateService } from 'src/app/services/app-update.service';
import { SettingsService } from 'src/app/services/settings.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {

  constructor(
    private storeSvc: StorageService,
    private updateSvc: AppUpdateService,
    private settingsSvc: SettingsService
  ) {
  }

  public get certificates$() : Observable<DCCertificate[]>{
    return this.storeSvc.listCertificates().pipe(
      filter(v => v.length > 0)
    );
  }

  public isDefault(certIDToTest: string) : boolean{
    return this.settingsSvc.defaultCert === certIDToTest;
  }

  public get canInstall$(): Observable<boolean> {
    return this.updateSvc.canInstallApp$;
  }

  public install(): void {
    this.updateSvc.install();
  }

}
