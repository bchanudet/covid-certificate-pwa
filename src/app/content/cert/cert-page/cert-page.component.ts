import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DCCertificate } from 'src/app/models/certificate';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cert-page',
  templateUrl: './cert-page.component.html',
  styleUrls: ['./cert-page.component.scss']
})
export class CertPageComponent {

  public certificate$: Observable<DCCertificate>;
  public removeStep = 0;
  public inError = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeSvc: StorageService
  ) {
    this.certificate$ = this.route.params.pipe(
      filter(newParams => {
        if(!this.storeSvc.hasCertificate(newParams.id)){
          this.inError = true;
          return false;
        }
        return true;
      }),
      map(newParams => this.storeSvc.getCertificate(newParams.id) as DCCertificate),
    )
  }

  remove(certId: string): void{
    if(this.removeStep == 0){
      this.removeStep += 1;
      return;
    }
    if(this.storeSvc.removeCertificate(certId)){
      void this.router.navigate(['/list']);
    }
  }
}
