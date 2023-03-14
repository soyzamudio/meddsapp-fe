import { ForModule } from '@rx-angular/template/for';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';
import { PillComponent } from './../shared/components/pill/pill.component';
import { AgePipe } from './../shared/pipes/age.pipe';
import { PatientService } from './../shared/services/patient.service';
import { Patient } from '../shared/interfaces';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [
    CommonModule,
    DashboardBlockComponent,
    FontAwesomeModule,
    AgePipe,
    PillComponent,
    RouterModule,
    ReactiveFormsModule,
    ForModule,
    InfiniteScrollModule,
  ],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss'],
})
export class PatientsComponent {
  formGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });
  faEdit = faEdit;
  faTrash = faTrash;
  faTimes = faTimes;
  limit = 25;
  offset = 0;
  patients: Patient[] = [];
  searchedValue = '';

  constructor(public patientService: PatientService) {
    this.patients = this.patientService.getPatients(this.limit, this.offset)
  }

  scrolled() {
    this.offset += this.limit;
    console.log(this.offset);
    this.patients = [
      ...this.patients,
      ...this.patientService.getPatients(this.limit, this.offset),
    ];
  }

  searchPatient() {
    this.searchedValue = this.formGroup.get('searchTerm')?.value as string;
    this.patients = this.patientService.searchPatients(this.searchedValue);
  }

  trackByPatient(index: number, patient: Patient) {
    return patient.id;
  }
}
