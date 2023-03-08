import { APP_ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(APP_ROUTES),
      FontAwesomeModule,
      BsDatepickerModule.forRoot(),
      BrowserModule,
      BrowserAnimationsModule
    ])
  ],
}).catch(err => console.error(err));
