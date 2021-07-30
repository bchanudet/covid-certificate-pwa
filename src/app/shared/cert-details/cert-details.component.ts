import { Component, Input, OnInit } from '@angular/core';
import { DCCertificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-cert-details',
  templateUrl: './cert-details.component.html',
  styleUrls: ['./cert-details.component.scss']
})
export class CertDetailsComponent{

  @Input() cert?: DCCertificate;
  @Input() showToggleButton?: boolean = true;
  @Input() showDetails?: boolean = false;

  constructor() { }

  ToggleDetails(): void{
    this.showDetails = !this.showDetails;
  }

}
