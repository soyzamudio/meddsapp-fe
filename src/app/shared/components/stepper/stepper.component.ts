import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent {
  @Input() status: 'scheduled' | 'waiting' | 'ongoing' | 'paid' | undefined;
  @Output() scheduledClick = new EventEmitter();
  @Output() waitingClick = new EventEmitter();
  @Output() ongoingClick = new EventEmitter();
  @Output() paidClick = new EventEmitter();

  onWaitingClick() {
    this.waitingClick.emit(true);
  }

  onScheduledClick() {
    this.scheduledClick.emit(true);
  }

  onOngoingClick() {
    this.ongoingClick.emit(true);
  }

  onPaidClick() {
    this.paidClick.emit(true);
  }
}
