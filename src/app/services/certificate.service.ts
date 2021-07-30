/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Injectable } from '@angular/core';
import { DCCertificate, DualValue, RecoveryEntry, TestEntry, VaccinationEntry } from '../models/certificate';
import { Observable, of, throwError } from 'rxjs';
import * as b45 from 'base45-ts';
import * as pako from 'pako';
import * as cbor from 'cbor-redux';

import * as Countries from '../references/country-2-codes';
import * as Diseases from '../references/disease-agent-targeted';
import * as TestManfs from '../references/test-manf';
import * as TestResults from '../references/test-result';
import * as TestTypes from '../references/test-type';
import * as VaccManfs from '../references/vaccine-mah-manf';
import * as VaccProds from '../references/vaccine-medicinal-product';
import * as VaccProph from '../references/vaccine-prophylaxis';


@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  private _decodeCBOR(buf: Uint8Array): any{
    return cbor.decode<any>(buf.buffer.slice(buf.byteOffset, buf.byteLength + buf.byteOffset));
  }

  public isValidQRCode(qrcode: string): boolean{
    return qrcode.startsWith('HC1');
  }

  public createFromQRCode(qrcode : string): Observable<DCCertificate>{
    let data: string = qrcode;

    if (data.startsWith('HC1')) {
      data = data.substring(3);
      if (data.startsWith(':')) {
        data = data.substring(1)
      }
      else {
        return throwError("Bad header");
      }
    }
    else {
      return throwError("Not a cert");
    }

    const decoded: Uint8Array = b45.decode(data);
    let test: Uint8Array =  new Uint8Array();
    if(decoded[0] == 0x78){
      test = pako.inflate(decoded);
    }
    const components: any[] = cbor.decode<any>(test.buffer);
    if(components.length !== 4){
      return throwError("Bad number of components");
    }

    const payload = this._decodeCBOR(components[2]);
    if(typeof payload !== 'object'){
      return throwError("Not an object");
    }
    if(payload["-260"] === undefined){
      return throwError("Not a correct payload");
    }

    const parsed = payload["-260"]["1"];
    console.log(parsed);

    const dccert: DCCertificate = {
      id: "" + Date.now(),
      qr_content: qrcode,
      date_birth: parsed.dob,
      forenames : {
        formatted: parsed.nam.gn,
        raw: parsed.nam.gnt
      },
      lastnames: {
        formatted: parsed.nam.fn,
        raw:  parsed.nam.fnt
      },
      vaccines: [],
      tests: [],
      recoveries: []
    };

    if(parsed['v'] !== undefined && Array.isArray(parsed.v)){
      dccert.vaccines = parsed.v.map((e: any) => {
        return this._parseVaccinePart(e)
      });
    }
    else if(parsed['t'] !== undefined && Array.isArray(parsed.t)){
      dccert.tests = parsed.t.map((e: any) => {
        return this._parseTestPart(e);
      });
    }
    else if(parsed['r'] !== undefined && Array.isArray(parsed.r)){
      dccert.recoveries = parsed.r.map((e: any) => {
        return this._parseRecoveryPart(e);
      });
    }
    else{
      return throwError('No type of certificate');
    }

    return of(dccert);
  }
  private _parseVaccinePart(data: any): VaccinationEntry{

    const entry : VaccinationEntry = {
      disease : this._findDisease(data.tg),
      country : this._findCountry(data.co),
      prophylaxis : this._findVaccProph(data.vp),
      manufacturer : this._findVaccManf(data.ma),
      medicinal_product : this._findVaccProd(data.mp),
      number_total : data.dn +" / "+ data.sd,
      vaccinated_on : data.dt,
      issuer : data.is,
      id: data.ci
    }
    return entry;
  }
  private _parseRecoveryPart(data: any): RecoveryEntry{
    const entry : RecoveryEntry = {
      disease : this._findDisease(data.tg),
      country : this._findCountry(data.co),
      first_positive_on: data.fr,
      valid_from: data.df,
      valid_until: data.du,
      issuer : data.is,
      id: data.ci
    }

    return entry;
  }
  private _parseTestPart(data: any): TestEntry{

    const entry : TestEntry = {
      disease : this._findDisease(data.tg),
      type: this._findTestType(data.tt),
      name: data.nm,
      manufacturer: this._findTestManf(data.ma),
      collected_on: data.sc,
      result: this._findTestResult(data.tr),
      testing_center: data.tc,
      country: this._findCountry(data.co),
      issuer : data.is,
      id: data.ci
    }
    return entry;
  }


  private _findCountry(id: string): DualValue {
    const v = Countries.values.find((v) => v.id === id);
    return {
      raw: id,
      formatted: v !== undefined ? v.display :''
    };
  }
  private _findDisease(id: string): DualValue{
    const v = Diseases.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: v !== undefined ? v.display : ''
    }
  }


  private _findTestManf(id: string): DualValue{
    const f = TestManfs.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private _findTestResult(id: string): DualValue{
    const f = TestResults.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private _findTestType(id: string): DualValue{
    const f = TestTypes.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }

  private _findVaccManf(id: string): DualValue{
    const f = VaccManfs.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private _findVaccProd(id: string): DualValue{
    const f = VaccProds.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private _findVaccProph(id: string): DualValue{
    const f = VaccProph.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
}
