import { Component, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  @Input() data: string = "";
  public size = 450;

  constructor() { }

  ngOnInit(): void {
    this.size = Math.min(450, window.innerWidth);
  }
}
