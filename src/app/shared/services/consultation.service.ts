import { PatientService } from './patient.service';
import { Injectable } from '@angular/core';
import { Consultation } from '../interfaces';
import { generateConsultations } from '../utils/consultations';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  consultations: Consultation[] = [];

  constructor(private patientService: PatientService) { }

  createConsultation(consultation: Consultation) {
    this.consultations.push(consultation);
    const patient = this.patientService.getPatientById(consultation.patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }
    if (!patient.consultations) {
      patient.consultations = [];
    }
    patient.consultations.push(consultation);
    patient.nextConsultation = consultation;
  }

  getTodayConsultations(): Consultation[] {
    return this.consultations.filter(consultation => {
      const today = new Date();
      return (
        consultation.date.getDate() === today.getDate() &&
        consultation.date.getMonth() === today.getMonth() &&
        consultation.date.getFullYear() === today.getFullYear()
      );
    }).sort(function(a,b){
      return (new Date(a.date) as any) - (new Date(b.date) as any);
    })
  }

  getConsultationsByDate(date: Date): Consultation[] {
    return this.consultations.filter(consultation => {
      return (
        consultation.date.getDate() === date.getDate() &&
        consultation.date.getMonth() === date.getMonth() &&
        consultation.date.getFullYear() === date.getFullYear()
      );
    });
  }

  isTimeAvailable(date: Date, time: string): boolean {
    const consultations = this.getConsultationsByDate(date);
    const timeAvailable = consultations.every(consultation => {
      return consultation.time !== time;
    });

    return timeAvailable;
  }

  getTodayConfirmedConsultations(): Consultation[] {
    return this.getTodayConsultations().filter(consultation => {
      return consultation.confirmed;
    });
  }

  getTodayUnconfirmedConsultations(): Consultation[] {
    return this.getTodayConsultations().filter(consultation => {
      return !consultation.confirmed;
    });
  }

  confirmConsultation(consultation: Consultation): void {
    const index = this.consultations.findIndex(
      c => c.date === consultation.date
    );

    if (index === -1) {
      throw new Error('Consultation not found');
    }

    consultation.confirmed = true;
    this.consultations[index] = consultation;
  }

  cancelConsultation(consultation: Consultation): void {
    const index = this.consultations.findIndex(
      c => c.date === consultation.date
    );

    if (index === -1) {
      throw new Error('Consultation not found');
    }

    this.consultations.splice(index, 1);
  }
}
