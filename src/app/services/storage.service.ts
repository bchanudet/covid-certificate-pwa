import { localizedString } from '@angular/compiler/src/output/output_ast';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { DCCertificate } from '../models/certificate';

const KEY_LIST = 'certs';
const KEY_CERT = 'cert_';
const KEY_PREF = 'pref_';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storageEnabled: boolean = false;

  public get isStorageEnabled(): boolean{
    return this.storageEnabled;
  }

  constructor() {
    this.DetectStorage();
  }

  private DetectStorage(): void{
    let storage: any;
    try {
      storage = window["localStorage"];
      var x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      this.storageEnabled = true;
    }
    catch(e) {
      this.storageEnabled = e instanceof DOMException && (
        // everything except Firefox
        e.code === 22 ||
        // Firefox
        e.code === 1014 ||
        // test name field too, because code might not be present
        // everything except Firefox
        e.name === 'QuotaExceededError' ||
        // Firefox
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
        // acknowledge QuotaExceededError only if there's something already stored
        (storage && storage.length !== 0);
    }
  }

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

  HasAnyCertificate(): boolean{
    return this.GetIDs().length > 0;
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
    let cached = localStorage.getItem(KEY_CERT + id);
    if(cached === null){
      return undefined;
    }

    return JSON.parse(cached) as DCCertificate;
  }

  HasCertificate(id: string) : boolean{
    return this.GetIDs().indexOf(id) > -1;
  }

  RemoveCertificate(id: string): boolean{
    this.RemoveID(id);
    if(localStorage.getItem(KEY_CERT + id) !== null){
      localStorage.removeItem(KEY_CERT + id);
    }

    return true;
  }

  GetPreferenceValue(key: string): string{
    if(typeof localStorage.getItem(KEY_PREF + key) === "string"){
      return localStorage.getItem(KEY_PREF + key) as string;
    }

    return '';
  }

  SetPreferenceValue(key: string, value: string): void{
    localStorage.setItem(KEY_PREF + key, value);
  }
}
