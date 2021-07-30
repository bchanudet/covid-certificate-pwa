import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DCCertificate } from 'src/app/models/certificate';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-cert-page',
  templateUrl: './cert-page.component.html',
  styleUrls: ['./cert-page.component.scss']
})
export class CertPageComponent implements OnInit {

  public cert: DCCertificate | undefined = undefined;
  public removeStep = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeSvc: StorageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (newParams) => {
        const cert : DCCertificate | undefined = this.storeSvc.getCertificate(newParams.id);
        if(cert === undefined){
          return;
        }
        this.cert = cert;
      }
    )
  }

  remove(): void{
    if(this.cert === undefined){
      return;
    }
    if(this.removeStep == 0){
      this.removeStep += 1;
      return;
    }
    if(this.storeSvc.removeCertificate(this.cert.id)){
      void this.router.navigate(['/list']);
    }
  }
}
