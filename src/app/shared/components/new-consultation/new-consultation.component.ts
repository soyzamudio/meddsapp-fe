import { ConsultationService } from './../../services/consultation.service';
import { Patient } from './../../interfaces/index';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PatientService } from './../../services/patient.service';
import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';
import { faChevronDown, faUserPlus } from '@fortawesome/pro-regular-svg-icons';

const workTimes = (workHours: string[], intervals: number) => {
  // create an array of times between workHours (work hours is an array of two strings) with intervals per minute
  const [start, end] = workHours;
  const [startHour, startMinute] = start.split(':').map(Number);
  const [endHour, endMinute] = end.split(':').map(Number);
  const times = [];
  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute = 0; minute < 60; minute += intervals) {
      if (hour === startHour && minute < startMinute) {
        continue;
      }
      if (hour === endHour && minute > endMinute) {
        continue;
      }
      if (minute === 0) {
        times.push(`${hour}:00`);
      } else {
        times.push(`${hour}:${minute}`);
      }
    }
  }

  console.log(times);
  return times;
}
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
  faUserPlus = faUserPlus;
  selectedPatient: Patient;
  selectedTime: string;
  selectedDate: Date = new Date();
  selectedNotes: string;
  availableTimes: string[] = [];
  workHours = ['8:00', '20:00'];
  workTimes = workTimes(this.workHours, 15);
  patientsList = this.patientService.getRecentPatients();
  @ViewChild('NewConsultationModal') modal:
    | ModalComponent<NewConsultationComponent>
    | undefined;

  constructor(public patientService: PatientService, private consultation: ConsultationService) {
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
    if (hour < 12) {
      return `${hour}:${minutes} AM`;
    } else {
      if (hour === 12) {
        return `${hour}:${minutes} PM`;
      }
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
      confirmed: false,
    });

    this.close();
  }

  async close(): Promise<void> {
    await this.modal?.close();
  }
}
