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

  public cert$: Observable<DCCertificate>;
  public hasStorage: boolean = false;
  public hasAlready: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private certSvc: CertificateService,
    private storeSvc: StorageService,
  ) {
    this.cert$ = this.route.params.pipe(
      switchMap((params) => {
        return this.certSvc.CreateFromQRCode(atob(params.qrcode));
      }),
      tap((cert: DCCertificate) => {
        this.hasAlready = this.storeSvc.HasCertificate(cert.id);
      })
    );
    this.hasStorage = this.storeSvc.isStorageEnabled;
  }



  ngOnInit(): void {
  }

  onCancel(): void {
    this.router.navigate(['/new', 'scan']);
  }

  onSubmit(cert: DCCertificate): void {
    this.storeSvc.AddCertificate(cert);
    this.router.navigate(['/list']);
  }

}
