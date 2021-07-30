import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  @Input() data = "";
  public size = 450;


  ngOnInit(): void {
    this.size = Math.min(450, window.innerWidth);
  }
}
