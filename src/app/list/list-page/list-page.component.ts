import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DCCertificate } from 'src/app/models/certificate';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {

  constructor(
    private storeSvc: StorageService
  ) { }

  public get certificates$() : Observable<DCCertificate[]>{
    return this.storeSvc.ListCertificates();
  }

  ngOnInit(): void {
  }

}
