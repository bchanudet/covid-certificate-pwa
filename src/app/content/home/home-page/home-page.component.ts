import { Component } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent{

  hasAnyCert: boolean;

  constructor(
    storeSvc: StorageService
  ) {
    this.hasAnyCert = storeSvc.hasAnyCertificate();
  }

}
