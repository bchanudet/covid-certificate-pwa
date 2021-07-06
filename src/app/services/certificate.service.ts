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

  constructor() { }

  private DecodeCBOR(buf: Uint8Array): any{
    return cbor.decode(buf.buffer.slice(buf.byteOffset, buf.byteLength + buf.byteOffset));
  }

  CreateFromQRCode(qrcode : string): Observable<DCCertificate>{
    let data: string = qrcode;

    if (data.startsWith('HC1')) {
      data = data.substring(3);
      if (data.startsWith(':')) {
         data = data.substring(1)
      } else {
        return throwError("Bad header");
      };
    } else {
        return throwError("Not a cert");
    };

    let decoded: Uint8Array = b45.decode(data);
    let test: Uint8Array =  new Uint8Array();
    if(decoded[0] == 0x78){
      test = pako.inflate(decoded);
    }
    let components: any[] = cbor.decode<any>(test.buffer);
    if(components.length !== 4){
      return throwError("Bad number of components");
    }

    let payload = this.DecodeCBOR(components[2]);
    if(typeof payload !== 'object'){
      return throwError("Not an object");
    }
    if(payload["-260"] === undefined){
      return throwError("Not a correct payload");
    }

    let parsed = payload["-260"]["1"];
    console.log(parsed);


    let dccert: DCCertificate = {
      type: 'unknown',
      firstname: parsed.nam.gnt,
      lastname: parsed.nam.fnt,
      date_birth: parsed.dob,

      qr_content: qrcode
    } as DCCertificate;

    if(parsed['v'] !== undefined){
      dccert = this.ParseVaccinePart(dccert, parsed.v[0]);
    }
    else if(parsed['t'] !== undefined){
      dccert = this.ParseTestPart(dccert, parsed.t[0]);
    }
    else if(parsed['r'] !== undefined){
      dccert = this.ParseRecoveryPart(dccert, parsed.r[0]);
    }
    else{
      return throwError('No type of certificate');
    }

    return of(dccert);
  }
  private ParseVaccinePart(cert: DCCertificate, data: any): DCCertificate{
    console.log("vaccine",data);

    let entry : VaccinationEntry = {
      disease : this.FindDisease(data.tg),
      country : this.FindCountry(data.co),
      prophylaxis : this.FindVaccProph(data.vp),
      manufacturer : this.FindVaccManf(data.ma),
      medicinal_product : this.FindVaccProd(data.mp),
      number_total : data.dn +" / "+ data.sd,
      vaccinated_on : data.dt,
    }

    cert.type = 'vaccine';
    cert.id = data.ci;
    cert.issuer = data.is;
    cert.entry = entry;
    return cert;
  }
  private ParseRecoveryPart(cert: DCCertificate, data: any): DCCertificate{
    console.log("recovery",data);

    let entry : RecoveryEntry = {
      disease : this.FindDisease(data.tg),
      country : this.FindCountry(data.co),
      first_positive_on: data.fr,
      valid_from: data.df,
      valid_until: data.du
    }

    cert.type = 'recovery';
    cert.id = data.ci;
    cert.issuer = data.is;
    cert.entry = entry;
    return cert;
  }
  private ParseTestPart(cert: DCCertificate, data: any): DCCertificate{
    console.log("test", data);

    let entry : TestEntry = {
      disease : this.FindDisease(data.tg),
      type: this.FindTestType(data.tt),
      name: data.nm,
      manufacturer: this.FindTestManf(data.ma),
      collected_on: data.sc,
      result: this.FindTestResult(data.tr),
      testing_center: data.tc,
      country: this.FindCountry(data.co)
    }

    cert.type = 'test';
    cert.id = data.ci;
    cert.issuer = data.is;
    cert.entry = entry;
    return cert;
  }


  private FindCountry(id: string): DualValue {
    let v = Countries.values.find((v) => v.id === id);
    return {
      raw: id,
      formatted: v !== undefined ? v.display :''
    };
  }
  private FindDisease(id: string): DualValue{
    let v = Diseases.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: v !== undefined ? v.display : ''
    }
  }


  private FindTestManf(id: string): DualValue{
    let f = TestManfs.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private FindTestResult(id: string): DualValue{
    let f = TestResults.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private FindTestType(id: string): DualValue{
    let f = TestTypes.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }

  private FindVaccManf(id: string): DualValue{
    let f = VaccManfs.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private FindVaccProd(id: string): DualValue{
    let f = VaccProds.values.find(v => v.id === id);return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
  private FindVaccProph(id: string): DualValue{
    let f = VaccProph.values.find(v => v.id === id);
    return {
      raw: id,
      formatted: f !== undefined ? f.display : ''
    }
  }
}
