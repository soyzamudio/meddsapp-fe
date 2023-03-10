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
  faUserDoctorHair,
} from '@fortawesome/pro-regular-svg-icons';
import { NgxPopperjsModule, NgxPopperjsTriggers } from 'ngx-popperjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, FontAwesomeModule, NgxPopperjsModule],
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
  hover = NgxPopperjsTriggers.hover;

  toggleNightMode() {
    document.body.classList.toggle('night-mode');
  }
}
