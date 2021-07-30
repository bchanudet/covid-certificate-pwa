import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { DCCertificate } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
  styleUrls: ['./check.component.scss']
})
export class CheckComponent {

  public cert$: Observable<DCCertificate>;
  public hasStorage = false;
  public hasAlready = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certSvc: CertificateService,
    private storeSvc: StorageService,
  ) {
    this.cert$ = this.route.params.pipe(
      switchMap((params) => {
        return this.certSvc.createFromQRCode(atob(params.qrcode));
      }),
      tap((cert: DCCertificate) => {
        this.hasAlready = this.storeSvc.hasCertificate(cert.id);
      })
    );
    this.hasStorage = this.storeSvc.isStorageEnabled;
  }

  onCancel(): Promise<boolean> {
    return this.router.navigate(['/new', 'scan']);
  }

  onSubmit(cert: DCCertificate): Promise<boolean> {
    this.storeSvc.addCertificate(cert);
    return this.router.navigate(['/list']);
  }

}
