export interface DualValue {
  raw: string;
  formatted: string;
}

export interface DCCertificate {
  qr_content: string;
  id: string;

  lastnames: DualValue;
  forenames: DualValue;
  date_birth: string;

  vaccines: VaccinationEntry[];
  tests: TestEntry[];
  recoveries: RecoveryEntry[];
}

export interface VaccinationEntry {
  disease: DualValue;
  prophylaxis: DualValue;
  medicinal_product: DualValue;
  manufacturer: DualValue;
  number_total: string;
  vaccinated_on: string;
  country: DualValue;
  issuer: string;
  id: string;
}

export interface TestEntry {
  disease: DualValue;
  type: DualValue;
  name: string;
  manufacturer: DualValue;
  collected_on: string;
  result: DualValue;
  testing_center: string;
  country: DualValue;
  issuer: string;
  id: string;
}

export interface RecoveryEntry {
  disease: DualValue;
  first_positive_on: string;
  valid_from: string;
  valid_until: string;
  country: DualValue;
  issuer: string;
  id: string;
}
