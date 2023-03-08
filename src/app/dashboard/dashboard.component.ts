import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';
import { Component, ElementRef, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatientService } from '../shared/services/patient.service';
import Chart, { ChartItem } from 'chart.js/auto';

const colors = {
  purple: {
    default: 'rgba(149, 76, 233, 1)',
    half: 'rgba(149, 76, 233, 0.5)',
    quarter: 'rgba(149, 76, 233, 0.25)',
    zero: 'rgba(149, 76, 233, 0)',
  },
  indigo: {
    default: 'rgba(80, 102, 120, 1)',
    quarter: 'rgba(80, 102, 120, 0.25)',
  },
};

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardBlockComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  consultationChart: any;

  constructor(private patients: PatientService) {}

  ngOnInit() {
    this.getConsultationsChart();
    console.log(this.getPatientsToday());
  }

  getPatientsToday() {
    return this.patients.getPatientsWithAppointmentsToday();
  }

  getConsultationsChart() {
    const consultations = this.patients.getConsultationsPerMonth();
    const months = Object.keys(consultations);
    const consultationsRef = document.getElementById('genderChart') as ChartItem;

    const ctx = (consultationsRef as any).getContext('2d');
    ctx.canvas.height = 250;

    const gradient = ctx.createLinearGradient(0, 25, 0, 300);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.35, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    this.consultationChart = new Chart(consultationsRef, {
      type: 'line',
      data: {
        labels: months.map((month) => `${month.slice(0, 3)}.`),
        datasets: [
          {
            label: 'Consultas',
            data: months.map((month) => consultations[month]),
            fill: true,
            backgroundColor: gradient,
            pointBackgroundColor: colors.purple.default,
            borderColor: '#3e95cd',
            tension: 0.5,
            borderWidth: 1,
            pointRadius: 0,
            borderJoinStyle: 'round',
          },
        ],
      },
      options: {
        layout: {
          padding: 10,
        },
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              padding: 10,
              autoSkip: false,
              maxRotation: 15,
              minRotation: 15,
            },
          },
          y: {
            grid: {
              display: true,
              color: colors.indigo.quarter,
            },
            ticks: {
              padding: 10,
            },
          },
        },
      },
    });
  }
}
