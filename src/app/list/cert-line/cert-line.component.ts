import { Component, Input, OnInit } from '@angular/core';
import { DCCertificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-cert-line',
  templateUrl: './cert-line.component.html',
  styleUrls: ['./cert-line.component.scss']
})
export class CertLineComponent implements OnInit {

  @Input() cert?: DCCertificate;

  public get icon(): string {
    switch(this.cert?.type){
      case 'vaccine': return 'ti-vaccine';
      case 'recovery': return 'ti-virus-off';
      case 'test': return 'ti-test-pipe';
      default: return '';
    }
  }

  constructor() { }

  ngOnInit(): void {
  }

}
