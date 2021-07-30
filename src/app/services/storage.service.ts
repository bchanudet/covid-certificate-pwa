/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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

  private storageEnabled = false;

  public get isStorageEnabled(): boolean{
    return this.storageEnabled;
  }

  constructor() {
    this._detectStorage();
  }

  private _detectStorage(): void{
    let storage: any;
    try {
      storage = window["localStorage"];
      const x = '__storage_test__';
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

  private _addToIDs(id: string) : boolean{
    const list = JSON.parse(localStorage.getItem(KEY_LIST) || '[]') as string[];
    if(list.find((e) => e === id) !== undefined){
      return false;
    }

    list.push(id);
    localStorage.setItem(KEY_LIST, JSON.stringify(list));
    return true;
  }
  private _getIDs(): string[]{
    return JSON.parse(localStorage.getItem(KEY_LIST) || '[]') as string[];
  }
  private _removeID(id:string): boolean{
    const ids: string[] = this._getIDs();
    if(ids.indexOf(id) > -1){
      ids.splice(ids.indexOf(id), 1);
      localStorage.setItem(KEY_LIST, JSON.stringify(ids));
    }
    return true;
  }

  hasAnyCertificate(): boolean{
    return this._getIDs().length > 0;
  }

  addCertificate(cert: DCCertificate): boolean{
    localStorage.setItem(KEY_CERT + cert.id, JSON.stringify(cert));
    return this._addToIDs(cert.id);
  }

  listCertificates() : Observable<DCCertificate[]> {

    const certs : DCCertificate[] = [];
    const ids : string[] = this._getIDs();

    for(let i = 0, l = ids.length; i < l; i+= 1){

      const cert : DCCertificate | undefined = this.getCertificate(ids[i]);
      if(cert === undefined){
        continue;
      }
      certs.push(cert);
    }

    return of(certs);
  }

  getCertificate(id: string) : DCCertificate | undefined {
    const cached = localStorage.getItem(KEY_CERT + id);
    if(cached === null){
      return undefined;
    }

    return JSON.parse(cached) as DCCertificate;
  }

  hasCertificate(id: string) : boolean{
    return this._getIDs().indexOf(id) > -1;
  }

  removeCertificate(id: string): boolean{
    this._removeID(id);
    if(localStorage.getItem(KEY_CERT + id) !== null){
      localStorage.removeItem(KEY_CERT + id);
    }

    return true;
  }

  getPreferenceValue(key: string): string{
    if(typeof localStorage.getItem(KEY_PREF + key) === "string"){
      return localStorage.getItem(KEY_PREF + key) as string;
    }

    return '';
  }

  setPreferenceValue(key: string, value: string): void{
    localStorage.setItem(KEY_PREF + key, value);
  }
}
