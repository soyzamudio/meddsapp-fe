import { ForModule } from '@rx-angular/template/for';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { PaymentService } from './../shared/services/payment.service';
import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentMethods } from '../shared/interfaces';
import { faFileExcel, faMagnifyingGlass } from '@fortawesome/pro-regular-svg-icons';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [
    CommonModule,
    DashboardBlockComponent,
    FormsModule,
    FontAwesomeModule,
    ForModule,
  ],
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
})
export class ReportsComponent {
  faMagnifyingGlass = faMagnifyingGlass;
  faFileExcel = faFileExcel;
  startDate = new Date();
  endDate = new Date();
  payments = this.paymentService.getPaymentsByDateRange(this.startDate, this.endDate);
  totalAmount = this.paymentService.getTotalAmountByDateRange(
    this.startDate,
    this.endDate
  );
  constructor(public paymentService: PaymentService) {
  }

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

  exportAsExcel() {
    const formatter = new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    });

    const ws = XLSX.utils.json_to_sheet(
      this.payments.map((payment) => ({
        Fecha: payment.createdAt,
        'Método de pago': this.getPaymentMethod(payment.paymentMethod),
        Paciente: payment.patientName,
        Monto: formatter.format(payment.amount),
      }))
    );
    ws['!cols'] = [
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
      { wch: 20 },
    ];
    XLSX.utils.sheet_add_aoa(ws, [['', '', 'Total', formatter.format(this.totalAmount)],], {
      origin: -1,
    });
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Pagos');
    XLSX.writeFile(wb, 'Pagos.xlsx');
  }

  getPaymentMethod(method: string) {
    return (PaymentMethods as any)[method];
  }

  trackByPayment(index: number, payment: any) {
    return payment.id;
  }
}
