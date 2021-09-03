import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { AppUpdateService } from '../services/app-update.service';
import { SettingsService } from '../services/settings.service';

@Injectable({
  providedIn: 'root'
})
export class HasNoDefaultCertGuard implements CanActivate {

  constructor(
    private updateSvc: AppUpdateService,
    private settingsSvc: SettingsService,
    private router: Router
  ){

  }

  canActivate(
    route: ActivatedRouteSnapshot
  ): boolean | UrlTree {

    const flag : string | null = route.queryParamMap.get("app");
    if(flag === "true"){

      this.updateSvc.setInApp(true);

      if(this.settingsSvc.defaultCert !== ""){
        return this.router.parseUrl("/cert/"+ this.settingsSvc.defaultCert);
      }

      console.log("has no default cert");
      return true;
    }
    return true;
  }

}
