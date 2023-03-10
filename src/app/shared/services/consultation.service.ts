import { Injectable } from '@angular/core';
import { Consultation } from '../interfaces';
import { generateConsultations } from '../utils/consultations';

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {
  consultations = generateConsultations(50);

  constructor() { }

  createConsultation(consultation: Consultation) {
    this.consultations.push(consultation);
  }

  getTodayConsultations(): Consultation[] {
    return this.consultations.filter(consultation => {
      const today = new Date();
      return (
        consultation.date.getDate() === today.getDate() &&
        consultation.date.getMonth() === today.getMonth() &&
        consultation.date.getFullYear() === today.getFullYear()
      );
    });
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
}
