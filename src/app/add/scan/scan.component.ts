import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ZXingScannerComponent } from '@zxing/ngx-scanner';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.component.html',
  styleUrls: ['./scan.component.scss']
})
export class ScanComponent implements OnInit, AfterViewInit {

  @ViewChild('scanner', {static: false})
  scanner!: ZXingScannerComponent;

  enabled: boolean = true;
  cameras: MediaDeviceInfo[] = [];
  note: string = 'Scan a QRCode';

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void{
    this.scanner.scanSuccess.subscribe(
      (qr_content: string) => {
        console.log("QR found", qr_content);
        this.router.navigate(['new', 'validate', btoa(qr_content)]);
      }
    )
  }


}
