import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
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
    return this.storeSvc.ListCertificates().pipe(
      filter(v => v.length > 0)
    );
  }

  ngOnInit(): void {
  }

}
