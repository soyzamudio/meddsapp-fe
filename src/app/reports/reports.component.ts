import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './../shared/services/payment.service';
import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethods } from '../shared/interfaces';
import { faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule, DashboardBlockComponent, FormsModule, FontAwesomeModule],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  startDate = new Date();
  endDate = new Date();
  payments = this.paymentService.getPayments();
  totalAmount = this.paymentService.getTotalAmountByDateRange(this.startDate, this.endDate);
  constructor(public paymentService: PaymentService) {}

  getAmountByDate() {
    this.payments = this.paymentService.getPaymentsByDateRange(
      this.startDate,
      this.endDate
    );
    this.totalAmount = this.paymentService.getTotalAmountByDateRange(
      this.startDate,
      this.endDate
    );
  }

  getPaymentMethod(method: string) {
    return (PaymentMethods as any)[method];
  }
}
