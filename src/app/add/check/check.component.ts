import { Component, OnInit } from '@angular/core';
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
export class CheckComponent implements OnInit {

  private currentCert: DCCertificate = {} as DCCertificate;

  public cert$: Observable<DCCertificate> = this.route.params.pipe(
      switchMap((params) => {
        return this.certSvc.CreateFromQRCode(atob(params.qrcode));
      }),
      tap((cert) => { this.currentCert = cert;})
    );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certSvc: CertificateService,
    private storeSvc: StorageService,

  ) { }



  ngOnInit(): void {
  }

  onCancel(): void {
    this.router.navigate(['new', 'scan']);
  }

  onSubmit(cert: DCCertificate): void {
    this.storeSvc.AddCertificate(cert);
    this.router.navigate(['/list']);
  }

}
