import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';
import { APP_ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(APP_ROUTES),
      FontAwesomeModule,
      BrowserModule,
      BrowserAnimationsModule,
      FullCalendarModule
    ])
  ],
}).catch(err => console.error(err));
