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
  patients = this.patientService.getPatients();
  searchedValue = '';

  constructor(public patientService: PatientService) {}

  searchPatient() {
    this.searchedValue = this.formGroup.get('searchTerm')?.value as string;
    console.log(this.searchedValue);

    this.patients = this.patientService.searchPatients(this.searchedValue);
  }
}
