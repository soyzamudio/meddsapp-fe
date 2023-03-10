import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core'; // useful for typechecking
import esLocale from '@fullcalendar/core/locales/es';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { ConsultationService } from './../shared/services/consultation.service';
import { ModalService } from './../shared/services/modal.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    locale: esLocale,
    initialView: 'dayGridMonth',
    events: this.consultation.consultations,
    editable: true,
    headerToolbar: {
      start: 'title',
      end: 'custom1 today prevYear,prev,next,nextYear'
    },
    customButtons: {
      custom1: {
        text: 'Agendar paciente',
        click: () => {
          this.openNewConsultationModal();
        }
      },
    }
  };

  constructor(private consultation: ConsultationService, private modalService: ModalService<any>) {}

  async openNewConsultationModal(): Promise<void> {
    const { NewConsultationComponent } = await import(
      '../shared/components/new-consultation/new-consultation.component'
    );
    await this.modalService.open(NewConsultationComponent);
  }
}
