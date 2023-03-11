import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDollarSign, faMoneyCheckDollarPen } from '@fortawesome/pro-regular-svg-icons';
import {
  NgxPopperjsContentComponent,
  NgxPopperjsModule,
  NgxPopperjsPlacements,
  NgxPopperjsTriggers,
} from 'ngx-popperjs';

@Component({
  selector: 'app-stepper',
  standalone: true,
  imports: [CommonModule, NgxPopperjsModule, FontAwesomeModule, FormsModule],
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent {
  faMoneyCheckDollarPen = faMoneyCheckDollarPen;
  faDollarSign = faDollarSign;
  NgxPopperjsTriggers = NgxPopperjsTriggers;
  NgxPopperjsPlacements = NgxPopperjsPlacements;
  amount: string;
  paymentMethod: string = 'cash';
  @ViewChild('paidAmount') paidAmount: NgxPopperjsContentComponent;
  @Input() status: 'scheduled' | 'waiting' | 'ongoing' | 'paid' | undefined;
  @Output() scheduledClick = new EventEmitter();
  @Output() waitingClick = new EventEmitter();
  @Output() ongoingClick = new EventEmitter();
  @Output() paidClick = new EventEmitter<{ amount: string, paymentMethod: string }>();

  onWaitingClick() {
    this.waitingClick.emit(true);
  }

  onScheduledClick() {
    this.scheduledClick.emit(true);
  }

  onOngoingClick() {
    this.ongoingClick.emit(true);
  }

  setAmount() {
    console.log(this.amount);
    this.paidAmount.hide();
    this.onPaidClick();
  }

  onPaidClick() {
    this.paidClick.emit({ amount: this.amount, paymentMethod: this.paymentMethod });
  }
}
