import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DCCertificate } from 'src/app/models/certificate';
import { AppUpdateService } from 'src/app/services/app-update.service';
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
    private route: ActivatedRoute
  ) {

    const flag : string | null = route.snapshot.queryParamMap.get("app");
    if(flag === "true"){
      this.updateSvc.setInApp(true);
    }
  }

  public get certificates$() : Observable<DCCertificate[]>{
    return this.storeSvc.listCertificates().pipe(
      filter(v => v.length > 0)
    );
  }

  public get canInstall$(): Observable<boolean> {
    return this.updateSvc.canInstallApp$;
  }

  public install(): void {
    this.updateSvc.install();
  }

}
