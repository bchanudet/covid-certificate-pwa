import { Injectable } from '@angular/core';
import { DCCertificate } from '../models/certificate';
import { Observable, of, throwError } from 'rxjs';
import * as b45 from 'base45-ts';
import * as pako from 'pako';
import * as cbor from 'cbor-redux';

import testManf from '../references/test-manf.json';
import diseases from '../references/disease-agent-targeted.json';
import { first } from 'rxjs/operators';

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
      firstname: parsed.nam.gnt,
      lastname: parsed.nam.fnt,
      date_birth: parsed.dob,


      disease: '',
      vaccine: '',
      medicinal_product: '',
      manufacturer: '',
      number_total: '',
      date_vaccination: '',
      member_state: '',
      certificate_issuer: '',

      qr_content: qrcode,
      id: Date.now().toString()
    }

    if(parsed['v'] !== undefined){
      console.log("vaccine");
      dccert.disease = parsed.v[0].tg;
    }

    return of(dccert);
  }


  public GetTestManf(id: string) : string{
    return '';
  }

  public GetDisease(id: string): string{
    if(diseases.valueSetValues["840539006"] === undefined){
      return '';
    }
    return diseases.valueSetValues["840539006"].display;
  }
}
