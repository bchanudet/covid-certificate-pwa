import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  hasAnyCert: boolean;

  constructor(
    storeSvc: StorageService
  ) {
    this.hasAnyCert = storeSvc.HasAnyCertificate();
  }

  ngOnInit(): void {
  }

}
