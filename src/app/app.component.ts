import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { faCommentMedical, faGear, faHouseMedical, faCalendarPlus, faUserDoctor, faLaptopMedical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMoon } from '@fortawesome/free-regular-svg-icons';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [RouterModule, FontAwesomeModule],
  standalone: true,
})
export class AppComponent {
  faHouseMedical = faHouseMedical;
  faCommentMedical = faCommentMedical;
  faCalendarPlus = faCalendarPlus;
  faGear = faGear;
  faMoon = faMoon;
  faUserDoctor = faUserDoctor;
  faLaptopMedical = faLaptopMedical;
}
