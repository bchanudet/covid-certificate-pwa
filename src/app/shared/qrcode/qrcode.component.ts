import { AfterViewChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.component.html',
  styleUrls: ['./qrcode.component.scss']
})
export class QrcodeComponent implements OnInit {

  @ViewChild('container') container!: HTMLDivElement;
  @Input() data: string = "";

  public size: number = 0;
  public display$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public clamp(...arg: number[]){
    return Math.min(...arg);
  }

  ngOnInit(): void {
  }
}
