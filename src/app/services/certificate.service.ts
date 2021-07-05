import { Injectable } from '@angular/core';
import { DCCertificate } from '../models/certificate';

const IDPREFIX = "";

@Injectable({
  providedIn: 'root'
})
export class CertificateService {

  constructor() { }

  CreateFromQRCode(qrcode : string): DCCertificate{
    const dccert: DCCertificate = {
      firstname: '',
      lastname: '',
      qr_content: qrcode,

      date_birth: '',
      disease: '',
      vaccine: '',
      medicinal_product: '',
      manufacturer: '',
      number_total: '',
      date_vaccination: '',
      member_state: '',
      certificate_issuer: '',
      id: IDPREFIX + Date.now()
    }

    return dccert;
  }
}
