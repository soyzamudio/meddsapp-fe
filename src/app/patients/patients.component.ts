import { RouterModule } from '@angular/router';
import { PatientService } from './../shared/services/patient.service';
import { PillComponent } from './../shared/components/pill/pill.component';
import { AgePipe } from './../shared/pipes/age.pipe';
import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Patient } from '../shared/interfaces';


@Component({
  selector: 'app-patients',
  standalone: true,
  imports: [CommonModule, DashboardBlockComponent, FontAwesomeModule, AgePipe, PillComponent, RouterModule],
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent {
  faEdit = faEdit;
  faTrash = faTrash;

  constructor(public patientService: PatientService) {}
}
