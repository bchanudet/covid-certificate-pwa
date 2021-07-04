import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Certificate } from '../models/certificate';

const KEY_LIST = 'certs';
const KEY_CERT = 'cert_';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  private AddToIDs(id: string) : boolean{
    let list = JSON.parse(localStorage.getItem(KEY_LIST) || '[]') as string[];
    if(list.find((e) => e === id) !== undefined){
      return false;
    }

    list.push(id);
    localStorage.setItem(KEY_LIST, JSON.stringify(list));
    return true;
  }
  private GetIDs(): string[]{
    return JSON.parse(localStorage.getItem(KEY_LIST) || '[]') as string[];
  }

  AddCertificate(cert: Certificate){
    localStorage.setItem(KEY_CERT + cert.id, JSON.stringify(cert));
    return this.AddToIDs(cert.id);
  }

  ListCertificates() : Observable<Certificate[]> {

    let certs : Certificate[] = [];
    let ids : string[] = this.GetIDs();

    for(let i = 0, l = ids.length; i < l; i+= 1){
      let cached = localStorage.getItem(KEY_CERT + ids[i]);
      if(cached === null){
        continue;
      }

      certs.push(JSON.parse(cached) as Certificate);
    }

    return of(certs);
  }
}
