import { ModalService } from './../../shared/services/modal.service';
import { faUserPlus } from '@fortawesome/pro-regular-svg-icons';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  faAt,
  faClockRotateLeft,
  faHospital,
  faPhone,
  faSmoking,
  faSyringe,
  faTablets,
  faTimeline,
  faUserPen,
  faWineGlass,
} from '@fortawesome/free-solid-svg-icons';
import { DashboardBlockComponent } from './../../shared/components/dashboard-block/dashboard-block.component';
import { PillComponent } from './../../shared/components/pill/pill.component';
import { BasicMedialInformationLabels } from './../../shared/interfaces/index';
import { AgePipe } from './../../shared/pipes/age.pipe';
import { PatientService } from './../../shared/services/patient.service';

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
  faPhone = faPhone;
  faAt = faAt;
  faSyringe = faSyringe;
  faHospital = faHospital;
  faTimeline = faTimeline;
  faClockRotateLeft = faClockRotateLeft;
  faSmoking = faSmoking;
  faWineGlass = faWineGlass;
  faUserPen = faUserPen;
  faUserPlus = faUserPlus;
  patientId = this.route.snapshot.params['id'];
  patient = this.patients.getPatientById(this.patientId) as any;
  basicInformationIndex = 0;
  today = new Date();
  keys = Object.keys;

  constructor(
    private route: ActivatedRoute,
    private patients: PatientService,
    private modalService: ModalService<any>
  ) {
    console.log(this.patient);
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

  async openNewConsultationModal(): Promise<void> {
    const { NewConsultationComponent } = await import(
      '../../shared/components/new-consultation/new-consultation.component'
    );
    await this.modalService.open(NewConsultationComponent);
  }
}
