import { Injectable } from '@angular/core';
import { Payment } from '../interfaces';
import { Chance } from 'chance';

const chance = new Chance();

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  payments: Payment[] = chance.n(() => {
    return {
      id: chance.guid(),
      patientName: chance.name(),
      amount: chance.floating({ min: 0, max: 1000, fixed: 2 }),
      paymentMethod: chance.pickone(['cash', 'card', 'transfer', 'check']),
      createdAt: new Date(),
    };
  }, 100);
  constructor() {}

  getPayments() {
    return this.payments;
  }

  createPayment(payment: Payment) {
    payment.id = chance.guid();
    payment.createdAt = new Date();
    this.payments.push(payment);
  }

  getPaymentsByPatientName(patientName: string) {
    return this.payments.filter(
      (payment) => payment.patientName === patientName
    );
  }

  getPaymentsByPaymentMethod(paymentMethod: string) {
    return this.payments.filter(
      (payment) => payment.paymentMethod === paymentMethod
    );
  }

  getPaymentsByDateRange(startDate: Date, endDate: Date) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return this.payments.filter(
      (payment) =>
        payment.createdAt.getTime() >=
          new Date(startDate.setHours(0, 0, 0, 0)).getTime() &&
        payment.createdAt.getTime() <=
          new Date(endDate.setHours(23, 59, 59, 999)).getTime()
    );
  }

  getTotalAmountByDateRange(startDate: Date, endDate: Date) {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    return this.getPayments()
      .filter(
        (payment) =>
          payment.createdAt.getTime() >=
            new Date(startDate.setHours(0, 0, 0, 0)).getTime() &&
          payment.createdAt.getTime() <=
            new Date(endDate.setHours(23, 59, 59, 999)).getTime()
      )
      .reduce((acc, payment) => acc + payment.amount, 0);
  }
}
