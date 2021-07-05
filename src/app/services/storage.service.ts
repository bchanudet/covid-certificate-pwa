import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DCCertificate } from '../models/certificate';

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
  private RemoveID(id:string): boolean{
    let ids: string[] = this.GetIDs();
    if(ids.indexOf(id) > -1){
      ids.splice(ids.indexOf(id),1);
      localStorage.setItem(KEY_LIST, JSON.stringify(ids));
    }
    return true;
  }


  AddCertificate(cert: DCCertificate){
    localStorage.setItem(KEY_CERT + cert.id, JSON.stringify(cert));
    return this.AddToIDs(cert.id);
  }

  ListCertificates() : Observable<DCCertificate[]> {

    let certs : DCCertificate[] = [];
    let ids : string[] = this.GetIDs();

    for(let i = 0, l = ids.length; i < l; i+= 1){

      let cert : DCCertificate | undefined = this.GetCertificate(ids[i]);
      if(cert === undefined){
        continue;
      }
      certs.push(cert);
    }

    return of(certs);
  }

  GetCertificate(id: string) : DCCertificate | undefined {
    console.log("looking for", id);
    let cached = localStorage.getItem(KEY_CERT + id);
    if(cached === null){
      console.error("Certificate not found", id);
      return undefined;
    }

    return JSON.parse(cached) as DCCertificate;
  }

  RemoveCertificate(id: string): boolean{
    this.RemoveID(id);
    if(localStorage.getItem(KEY_CERT + id) !== null){
      localStorage.removeItem(KEY_CERT + id);
    }

    return true;
  }
}
