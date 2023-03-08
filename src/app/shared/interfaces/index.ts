export interface Patient {
  id: string;
  name: string;
  dob: Date;
  active: boolean;
  gender?: string;
  createdAt?: Date;
  contactDetails?: ContactDetails;
  lastConsultation?: Consultation | null;
  nextConsultation?: Consultation;
  medicalHistory?: MedicalHistory;
  familyHistory?: FamilyHistory;
  medications?: Medication[];
  allergies?: Allergy[];
  immunizations?: Immunization[];
  diagnosticTestResults?: DiagnosticTestResult[];
  consultations?: Consultation[];
  lifestyleInformation?: LifestyleInformation;
  basicMedicalInformation?: BasicMedicalInformation[];
  notes?: string[];
}

export interface BasicMedicalInformation {
  takenAt: Date;
  information: {
    height: number | null;
    weight: number | null;
    bloodType: string | null;
    bloodPressure: string | null;
    heartRate: number | null;
    respiratoryRate: number | null;
    temperature: number | null;
  }
}

export interface ContactDetails {
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
  };
}

export interface MedicalHistory {
  conditions?: string[];
  surgeries?: Surgery[];
  hospitalizations?: Hospitalization[];
}

export interface Surgery {
  name: string;
  date: Date;
}

export interface Hospitalization {
  reason: string;
  date: Date;
  dischargeDate?: Date;
}

export interface FamilyHistory {
  conditions: string[];
}

export interface Medication {
  name: string;
  dosage: string;
  startDate: Date;
  endDate?: Date;
}

export interface Allergy {
  name: string;
  reaction: string;
}

export interface Immunization {
  name: string;
  date: Date;
}

export interface DiagnosticTestResult {
  name: string;
  date: Date;
  results: string[];
}

export interface Consultation {
  patientId: string;
  date: Date;
  notes?: string;
}

export interface LifestyleInformation {
  diet: string;
  exercise: string;
  smoking: boolean;
}

export const BasicMedialInformationLabels = {
  height: 'Altura',
  weight: 'Peso',
  bloodType: 'sangre',
  bloodPressure: 'Pres. arterial',
  heartRate: 'Frec. cardiaca',
  respiratoryRate: 'Frec. respiratoria',
  temperature: 'Temperatura',
}
