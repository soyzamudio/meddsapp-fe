import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  faCalendarCheck,
  faChartLine,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import Chart, { ChartItem } from 'chart.js/auto';
import { PatientService } from '../shared/services/patient.service';
import { DashboardBlockComponent } from './../shared/components/dashboard-block/dashboard-block.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, DashboardBlockComponent, RouterModule, BsDatepickerModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  consultationChart: any;
  faUser = faUser;
  faChartLine = faChartLine;
  faCalendarCheck = faCalendarCheck;
  date = new Date();

  constructor(public patients: PatientService) {}

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
    const consultationsRef = document.getElementById(
      'monthly-consultations'
    ) as ChartItem;

    const ctx = (consultationsRef as any).getContext('2d');
    ctx.canvas.height = 250;

    const data = {
      labels: months.map((month) => `${month.slice(0, 3)}.`),
      datasets: [
        {
          data: months.map((month) => consultations[month]),
          borderRadius: 10,
          // get 12 random colors
          backgroundColor: '#3730a350',
          hoverBackgroundColor: '#3730a3',
        },
      ],
    };

    this.consultationChart = new Chart(consultationsRef, {
      type: 'bar',
      data,
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            grid: {
              color: 'rgba(0,0,0,.1)',
              tickColor: 'rgba(0,0,0,0)',
            },
            border: {
              dash: [5, 10],
              display: false,
            },
            ticks: {
              callback: function(tick, index, array) {
                return (index % 2) ? "" : tick;
              },
            },
            beginAtZero: true,
          },
          x: {
            grid: {
              display: false,
              tickColor: 'rgba(0,0,0,0)',
            },
            border: {
              display: false,
            },
          },
        },
      },
    });
  }
}
