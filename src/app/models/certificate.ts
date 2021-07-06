export interface DualValue {
  raw: string;
  formatted: string;
}

export interface DCCertificate {
  qr_content: string;
  id: string;
  type: 'unknown' | 'vaccine' | 'test' | 'recovery';

  lastname: DualValue;
  firstname: DualValue;
  date_birth: string;

  entry: VaccinationEntry | TestEntry | RecoveryEntry;
  issuer: string;
}

export interface VaccinationEntry {
  disease: DualValue;
  prophylaxis: DualValue;
  medicinal_product: DualValue;
  manufacturer: DualValue;
  number_total: string;
  vaccinated_on: string;
  country: DualValue;
}

export interface TestEntry {
  disease: DualValue;
  type: DualValue;
  name: DualValue;
  manufacturer: DualValue;
  collected_on: string;
  result: DualValue;
  testing_center: string;
  country: DualValue;
}

export interface RecoveryEntry {
  disease: DualValue;
  first_positive_on: string;
  valid_from: string;
  valid_until: string;
  country: DualValue;
}
