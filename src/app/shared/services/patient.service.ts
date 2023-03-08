import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../interfaces';
import { Chance } from 'chance';

const chance = new Chance();

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients: Patient[] = [
    {
      id: '1',
      createdAt: chance.date(),
      name: chance.name(),
      dob: chance.birthday(),
      gender: chance.gender(),
      lastConsultation: {
        patientId: '1',
        date: new Date(chance.date({ year: 2022 })),
      },
      nextConsultation: {
        patientId: '1',
        date: new Date(chance.date({ year: new Date().getFullYear() })),
      },
      active: chance.bool(),
      medicalHistory: {
        conditions: chance.n(chance.word, 5),
      },
      medications: [
        {
          name: chance.word(),
          dosage: chance.integer({ min: 1, max: 10 }) + chance.pickone(['mg', 'g', 'ml']),
          startDate: new Date(chance.date({ year: 2022 })),
          endDate: new Date(chance.date({ year: 2022 })),
        },
        {
          name: chance.word(),
          dosage: chance.integer({ min: 1, max: 10 }) + chance.pickone(['mg', 'g', 'ml']),
          startDate: new Date(chance.date({ year: 2022 })),
          endDate: new Date(chance.date({ year: 2022 })),
        },
        {
          name: chance.word(),
          dosage: chance.integer({ min: 1, max: 10 }) + chance.pickone(['mg', 'g', 'ml']),
          startDate: new Date(chance.date({ year: 2022 })),
          endDate: new Date(chance.date({ year: 2022 })),
        },
      ],
      basicMedicalInformation: [
        {
          takenAt: new Date(chance.date({ year: 2022 })),
          information: {
            height: chance.integer({ min: 100, max: 200 }),
            weight: chance.integer({ min: 40, max: 100 }),
            bloodType: chance.pickone(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            bloodPressure: chance.integer({ min: 80, max: 120 }) + '/' + chance.integer({ min: 80, max: 120 }),
            heartRate: chance.integer({ min: 60, max: 100 }),
            respiratoryRate: chance.integer({ min: 10, max: 20 }),
            temperature: null,
          }
        },
        {
          takenAt: new Date(chance.date({ year: 2022 })),
          information: {
            height: chance.integer({ min: 100, max: 200 }),
            weight: chance.integer({ min: 40, max: 100 }),
            bloodType: chance.pickone(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            bloodPressure: chance.integer({ min: 80, max: 120 }) + '/' + chance.integer({ min: 80, max: 120 }),
            heartRate: chance.integer({ min: 60, max: 100 }),
            respiratoryRate: chance.integer({ min: 10, max: 20 }),
            temperature: null,
          }
        }
      ]
    },
    {
      id: '2',
      createdAt: chance.date(),
      name: chance.name(),
      dob: chance.birthday(),
      gender: chance.gender(),
      lastConsultation: {
        patientId: '2',
        date: new Date(chance.date({ year: 2022 })),
      },
      nextConsultation: {
        patientId: '2',
        date: new Date(chance.date({ year: new Date().getFullYear() })),
      },
      active: chance.bool(),
      medicalHistory: {
        conditions: chance.n(chance.word, 5),
      },
      medications: [
        {
          name: chance.word(),
          dosage: chance.integer({ min: 1, max: 10 }) + chance.pickone(['mg', 'g', 'ml']),
          startDate: new Date(chance.date({ year: 2022 })),
          endDate: new Date(chance.date({ year: 2022 })),
        },
        {
          name: chance.word(),
          dosage: chance.integer({ min: 1, max: 10 }) + chance.pickone(['mg', 'g', 'ml']),
          startDate: new Date(chance.date({ year: 2022 })),
          endDate: new Date(chance.date({ year: 2022 })),
        },
      ],
      basicMedicalInformation: [
        {
          takenAt: new Date(chance.date({ year: 2022 })),
          information: {
            height: chance.integer({ min: 100, max: 200 }),
            weight: chance.integer({ min: 40, max: 100 }),
            bloodType: chance.pickone(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            bloodPressure: chance.integer({ min: 80, max: 120 }) + '/' + chance.integer({ min: 80, max: 120 }),
            heartRate: chance.integer({ min: 60, max: 100 }),
            respiratoryRate: chance.integer({ min: 10, max: 20 }),
            temperature: null,
          }
        }
      ]
    },
    {
      id: '3',
      createdAt: chance.date(),
      name: chance.name(),
      dob: chance.birthday(),
      gender: chance.gender(),
      lastConsultation: {
        patientId: '3',
        date: new Date(chance.date({ year: 2022 })),
      },
      nextConsultation: {
        patientId: '3',
        date: new Date(chance.date({ year: new Date().getFullYear() })),
      },
      active: chance.bool(),
      medicalHistory: {
        conditions: chance.n(chance.word, 5),
      },
      medications: [],
      basicMedicalInformation: [
        {
          takenAt: new Date(chance.date({ year: 2022 })),
          information: {
            height: chance.integer({ min: 100, max: 200 }),
            weight: chance.integer({ min: 40, max: 100 }),
            bloodType: chance.pickone(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']),
            bloodPressure: chance.integer({ min: 80, max: 120 }) + '/' + chance.integer({ min: 80, max: 120 }),
            heartRate: chance.integer({ min: 60, max: 100 }),
            respiratoryRate: chance.integer({ min: 10, max: 20 }),
            temperature: null,
          }
        }
      ]
    },
  ]
  constructor() { }

  getActivePatients(): Observable<Patient[]> {
    return of(this.patients.filter(patient => patient.active));
  }

  getPatientByName(name: string): Observable<Patient[]> {
    return of(this.patients.filter(patient => patient.name.toLowerCase().includes(name.toLowerCase())));
  }

  getPatientById(id: string): Patient {
    const patient = this.patients.find(patient => patient.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  }

  addPatient(patient: Patient): Observable<Patient> {
    this.patients.push(patient);
    return of(patient);
  }

  updatePatient(patient: Patient): Observable<Patient> {
    const index = this.patients.findIndex(p => p.id === patient.id);
    if (index === -1) {
      throw new Error('Patient not found');
    }

    this.patients[index] = patient;
    return of(patient);
  }

  deletePatient(id: string): Observable<Patient> {
    const index = this.patients.findIndex(p => p.id === id);
    if (index === -1) {
      throw new Error('Patient not found');
    }

    const patient = this.patients[index];
    this.patients.splice(index, 1);
    return of(patient);
  }

  getPatientCount(): Observable<number> {
    return of(this.patients.length);
  }

  getPatientCountPerGender(): { [key: string]: number } {
    const count: Record<string, number> = {};
    for (const patient of this.patients) {
      count[patient.gender as string] = (count[patient.gender as string] || 0) + 1;
    }

    count['total'] = this.patients.length;

    return count;
  }

  getConsultationsPerMonth(): { [key: string]: number } {
    return {
      'January': chance.integer({ min: 5, max: 100 }),
      'February': chance.integer({ min: 5, max: 100 }),
      'March': chance.integer({ min: 5, max: 100 }),
      'April': chance.integer({ min: 5, max: 100 }),
      'May': chance.integer({ min: 5, max: 100 }),
      'June': chance.integer({ min: 5, max: 100 }),
      'July': chance.integer({ min: 5, max: 100 }),
      'August': chance.integer({ min: 5, max: 100 }),
      'September': chance.integer({ min: 5, max: 100 }),
      'October': chance.integer({ min: 5, max: 100 }),
      'November': chance.integer({ min: 5, max: 100 }),
      'December': chance.integer({ min: 5, max: 100 }),
    };
  }
}
