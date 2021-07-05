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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storeSvc: StorageService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (newParams) => {
        console.log("newparams", newParams);
        let cert : DCCertificate | undefined = this.storeSvc.GetCertificate(newParams.id);
        if(cert === undefined){
          return;
        }
        console.log("found", cert);
        this.cert = cert;
      }
    )
  }

  Remove(): void{
    if(this.cert === undefined){
      return;
    }
    if(this.storeSvc.RemoveCertificate(this.cert.id)){
      this.router.navigate(['/list']);
    }
  }
}
