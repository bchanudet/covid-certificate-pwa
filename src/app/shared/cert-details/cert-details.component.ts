import { Component, Input, OnInit } from '@angular/core';
import { DCCertificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-cert-details',
  templateUrl: './cert-details.component.html',
  styleUrls: ['./cert-details.component.scss']
})
export class CertDetailsComponent implements OnInit {

  @Input() cert?: DCCertificate;

  constructor() { }

  ngOnInit(): void {
  }

}
