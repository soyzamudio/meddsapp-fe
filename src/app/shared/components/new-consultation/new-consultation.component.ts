import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-new-consultation',
  standalone: true,
  imports: [CommonModule, ModalComponent],
  templateUrl: './new-consultation.component.html',
  styleUrls: ['./new-consultation.component.scss'],
})
export class NewConsultationComponent {
  dropdownOpen = false;
  @ViewChild('NewConsultationModal') modal:
    | ModalComponent<NewConsultationComponent>
    | undefined;

  async close(): Promise<void> {
    await this.modal?.close();
  }
}
