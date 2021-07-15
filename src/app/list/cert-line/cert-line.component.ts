import { Component, Input, OnInit } from '@angular/core';
import { DCCertificate } from 'src/app/models/certificate';

@Component({
  selector: 'app-cert-line',
  templateUrl: './cert-line.component.html',
  styleUrls: ['./cert-line.component.scss']
})
export class CertLineComponent implements OnInit {

  @Input() cert?: DCCertificate;

  constructor() { }

  ngOnInit(): void {
  }

}
