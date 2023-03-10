import { Injectable } from '@angular/core';
import { Chance } from 'chance';
import { Patient } from '../interfaces';
import { generatePatients } from '../utils/patient';

const chance = new Chance();

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  patients: Patient[] = generatePatients(100);
  recentPatients: Patient[] = JSON.parse(
    (localStorage.getItem('recentPatients') as string) || '[]'
  );

  constructor() {}

  getPatients(limit?: number, offset = 0): Patient[] {
    if (limit) {
      return this.patients.slice(offset, offset + limit);
    }
    return this.patients.sort((a: Patient, b: Patient) => {
      return a['name'].localeCompare(b['name']);
    });
  }

  getActivePatients(): Patient[] {
    return this.patients.filter((patient) => patient.active);
  }

  getPatientByName(name: string): Patient[] {
    return this.patients.filter((patient) =>
      patient.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  getPatientById(id: string): Patient {
    const patient = this.patients.find((patient) => patient.id === id);
    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  }

  searchPatients(searchTerm: string): Patient[] {
    return this.patients.filter((patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  addPatient(patient: Patient): Patient {
    this.patients.push(patient);
    return patient;
  }

  updatePatient(patient: Patient): Patient {
    const index = this.patients.findIndex((p) => p.id === patient.id);
    if (index === -1) {
      throw new Error('Patient not found');
    }

    this.patients[index] = patient;
    return patient;
  }

  deletePatient(id: string): Patient {
    const index = this.patients.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error('Patient not found');
    }

    const patient = this.patients[index];
    this.patients.splice(index, 1);
    return patient;
  }

  getPatientCount(): number {
    return this.patients.length;
  }

  getPatientCountPerGender(): { [key: string]: number } {
    const count: Record<string, number> = {};
    for (const patient of this.patients) {
      count[patient.gender as string] =
        (count[patient.gender as string] || 0) + 1;
    }

    count['total'] = this.patients.length;

    return count;
  }

  getConsultationsPerMonth(): { [key: string]: number } {
    return {
      Enero: chance.integer({ min: 5, max: 100 }),
      Febrero: chance.integer({ min: 5, max: 100 }),
      Marzo: chance.integer({ min: 5, max: 100 }),
      Abril: chance.integer({ min: 5, max: 100 }),
      Mayo: chance.integer({ min: 5, max: 100 }),
      Junio: chance.integer({ min: 5, max: 100 }),
      Julio: chance.integer({ min: 5, max: 100 }),
      Agosto: chance.integer({ min: 5, max: 100 }),
      Septiembre: chance.integer({ min: 5, max: 100 }),
      Octubre: chance.integer({ min: 5, max: 100 }),
      Noviembre: chance.integer({ min: 5, max: 100 }),
      Diciembre: chance.integer({ min: 5, max: 100 }),
    };
  }

  getPatientsWithAppointmentsToday(): Patient[] {
    return this.patients.filter(
      (patient) =>
        patient.nextConsultation?.date.toDateString() ===
        new Date().toDateString()
    );
  }

  getPatientsWithAppointmentsByDate(date: Date): Patient[] {
    return this.patients.filter(
      (patient) =>
        patient.consultations?.find(
          (consultation) =>
            consultation.date.toDateString() === date.toDateString()
        ) !== undefined
    );
  }

  getRecentPatients(): Patient[] {
    return this.recentPatients || [];
  }

  addToRecentPatients(patient: Patient): void {
    if (!this.recentPatients) {
      this.recentPatients = [];
    }

    const index = this.recentPatients.findIndex((p) => p.id === patient.id);
    if (index !== -1) {
      this.recentPatients.splice(index, 1);
    }

    this.recentPatients.unshift(patient);
    this.recentPatients.slice(0, 5);
    localStorage.setItem('recentPatients', JSON.stringify(this.recentPatients));
  }
}
