import { PillComponent } from './../../shared/components/pill/pill.component';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { DashboardBlockComponent } from './../../shared/components/dashboard-block/dashboard-block.component';
import {
  BasicMedialInformationLabels,
  Patient,
} from './../../shared/interfaces/index';
import { AgePipe } from './../../shared/pipes/age.pipe';
import { PatientService } from './../../shared/services/patient.service';
import { faTablets } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    DashboardBlockComponent,
    AgePipe,
    PillComponent,
    FontAwesomeModule,
  ],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss'],
})
export class DetailsComponent {
  faTablets = faTablets;
  patientId = this.route.snapshot.params['id'];
  patient = this.patients.getPatientById(this.patientId) as any;
  basicInformationIndex = 0;
  keys = Object.keys;

  constructor(
    private route: ActivatedRoute,
    private patients: PatientService
  ) {
    console.log(this.patient)
  }

  getLabel(key: string) {
    return BasicMedialInformationLabels[
      key as keyof typeof BasicMedialInformationLabels
    ];
  }

  getValue(key: string, value: any) {
    if (!value[key]) {
      return '-';
    }
    return value[key];
  }

  onBasicMedicalInformationChange(index: string) {
    this.basicInformationIndex = +index;
  }
}
