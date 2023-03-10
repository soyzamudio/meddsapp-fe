export interface Patient {
  id: string; // done
  name: string; // done
  dob: Date; // done
  active: boolean; // done
  gender?: string; // done
  createdAt?: Date; // done
  contactDetails?: ContactDetails; // done
  lastConsultation?: Consultation | null; // done
  nextConsultation?: Consultation | null; // done
  medicalHistory?: MedicalHistory; // done
  medications?: Medication[]; // done
  allergies?: Allergy[]; // done
  immunizations?: Immunization[]; // done
  basicMedicalInformation?: BasicMedicalInformation[]; // done
  lifestyleInformation?: LifestyleInformation; // done
  familyHistory?: FamilyHistory;
  diagnosticTestResults?: DiagnosticTestResult[];
  consultations?: Consultation[];
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
  days: number;
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
  title: string;
  date: Date;
  time: string;
  notes?: string;
}

export interface LifestyleInformation {
  diet: boolean;
  exercise: boolean;
  smoking: boolean;
  alcohol: boolean;
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
