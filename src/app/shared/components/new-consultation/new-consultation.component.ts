import { ConsultationService } from './../../services/consultation.service';
import { Patient } from './../../interfaces/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientService } from './../../services/patient.service';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { faChevronDown } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'app-new-consultation',
  standalone: true,
  imports: [CommonModule, ModalComponent, FontAwesomeModule],
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.scss'],
})
export class NewConsultationComponent {
  dropdownOpen = false;
  faChevronDown = faChevronDown;
  selectedPatient: Patient;
  selectedTime: string;
  selectedDate: Date = new Date();
  selectedNotes: string;
  availableTimes: string[] = [];
  workTimes = [
    '8:00',
    '9:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
  ];
  patientsList = this.patientService.getRecentPatients();
  @ViewChild('NewConsultationModal') modal:
    | ModalComponent<NewConsultationComponent>
    | undefined;

  constructor(public patientService: PatientService, private consultation: ConsultationService) {
    console.log(this.consultation.getConsultationsByDate(new Date()));
    this.workTimes.forEach((time) => {
      if (this.consultation.isTimeAvailable(new Date(), time)) {
        this.availableTimes.push(time);
      }
    });
  }

  getTimeAMPM(time: string): string {
    const timeArray = time.split(':');
    let hour = parseInt(timeArray[0], 10);
    const minutes = timeArray[1];
    if (hour <= 12) {
      return `${hour}:${minutes} AM`;
    } else {
      return `${hour - 12}:${minutes} PM`;
    }
  }

  timeIsDisabled(time: string): boolean {
    return !this.availableTimes.includes(time);
  }

  setConsultation() {
    const dateAsSting = this.selectedDate.toDateString();
    this.consultation.createConsultation({
      patientId: this.selectedPatient.id,
      title: this.selectedPatient.name,
      date: new Date(`${dateAsSting}, ${this.selectedTime}:00`),
      time: this.selectedTime,
      notes: this.selectedNotes || '',
    });

    console.log(this.consultation.consultations);
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }
}
