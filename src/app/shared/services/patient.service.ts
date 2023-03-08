import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Patient } from '../interfaces';
import { Chance } from 'chance';
import { generatePatients } from '../utils/patient';

const chance = new Chance();

@Injectable({
  providedIn: 'root'
})
export class PatientService {
  patients: Patient[] = generatePatients(100);

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

  getPatientsWithAppointmentsToday(): Patient[] {
    return this.patients.filter(patient => patient.nextConsultation?.date.toDateString() === new Date().toDateString());
  }
}
