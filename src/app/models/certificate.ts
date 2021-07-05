export interface DCCertificate {
  qr_content: string;
  id: string;

  lastname: string;
  firstname: string;
  date_birth: string;

  disease: string;
  vaccine: string;
  medicinal_product: string;
  manufacturer: string;
  number_total: string;
  date_vaccination: string;
  member_state: string;
  certificate_issuer: string;
}
