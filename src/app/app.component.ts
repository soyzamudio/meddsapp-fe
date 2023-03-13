import { ForModule } from '@rx-angular/template/for';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
import { faStaffSnake } from '@fortawesome/pro-light-svg-icons';
import {
  faCalendarPlus,
  faGear,
  faHouseMedical,
  faMessageMedical,
  faSquareDollar,
  faUserDoctorHair,
} from '@fortawesome/pro-regular-svg-icons';
import { NgxPopperjsModule, NgxPopperjsTriggers } from 'ngx-popperjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, FontAwesomeModule, NgxPopperjsModule, ForModule],
  standalone: true,
})
export class AppComponent {
  faHouseMedical = faHouseMedical;
  faCommentMedical = faMessageMedical;
  faCalendarPlus = faCalendarPlus;
  faGear = faGear;
  faMoon = faMoon;
  faUserDoctor = faUserDoctorHair;
  faLaptopMedical = faStaffSnake;
  faSquareDollar = faSquareDollar;
  hover = NgxPopperjsTriggers.hover;

  mobileMenuItems = [
    'Inicio',
    'Pacientes',
    'Calendario',
    'Mensajes',
    'Configuración',
  ];
  menuItems = [
    {
      icon: this.faHouseMedical,
      title: 'Inicio',
      link: '/',
    },
    {
      icon: this.faUserDoctor,
      title: 'Pacientes',
      link: '/pacientes',
    },
    {
      icon: this.faCalendarPlus,
      title: 'Calendario',
      link: '/calendario',
    },
    {
      icon: this.faCommentMedical,
      title: 'Mensajes',
      link: '/mensajes',
    },
    {
      icon: this.faSquareDollar,
      title: 'Reports',
      link: '/reportes',
    },
    {
      icon: this.faGear,
      title: 'Configuración',
      link: '/configuracion',
    },
  ];

  toggleNightMode() {
    document.body.classList.toggle('night-mode');
  }

  getMobileMenuItems(): { icon: any; title: string; link: string }[] {
    return this.menuItems.filter((item) => this.mobileMenuItems.includes(item.title));
  }
}
