import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalFadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.1s ease-in-out', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        style({ opacity: 1 }),
        animate('0.1s ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class ModalComponent<T> {
  display = true;
  faTimes = faTimes;

  constructor(private modalService: ModalService<T>) {}

  async close() {
    this.display = false;

    setTimeout(async () => {
      await this.modalService.close();
    }, 300);
  }
}
