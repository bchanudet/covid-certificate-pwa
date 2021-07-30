import { Component, Input } from '@angular/core';
import { DCCertificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-cert-line',
  templateUrl: './cert-line.component.html',
  styleUrls: ['./cert-line.component.scss']
})
export class CertLineComponent{

  @Input() cert?: DCCertificate;

}
