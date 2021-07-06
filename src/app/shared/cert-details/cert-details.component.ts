import { Component, Input, OnInit } from '@angular/core';
import { DCCertificate, RecoveryEntry, TestEntry, VaccinationEntry } from 'src/app/models/certificate';
import { CertificateService } from 'src/app/services/certificate.service';

@Component({
  selector: 'app-cert-details',
  templateUrl: './cert-details.component.html',
  styleUrls: ['./cert-details.component.scss']
})
export class CertDetailsComponent implements OnInit {

  @Input() cert: DCCertificate | null = null;

  public vaccine: VaccinationEntry | null = null;
  public test: TestEntry | null = null;
  public recovery: RecoveryEntry | null = null

  constructor(
    private certSvc: CertificateService
  ) { }

  ngOnInit(): void {
    if(this.cert === null){
      return;
    }

    switch(this.cert.type){
      case 'vaccine':
        this.vaccine = this.cert.entry as VaccinationEntry;
        return;
      case 'test':
        this.test = this.cert.entry as TestEntry;
        return;
      case 'recovery':
        this.recovery = this.cert.entry as RecoveryEntry;
        return;
    }
  }

}
