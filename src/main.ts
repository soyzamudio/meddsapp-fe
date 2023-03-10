import { importProvidersFrom } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxNotificationMsgModule } from 'ngx-notification-msg';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { APP_ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom([
      RouterModule.forRoot(APP_ROUTES),
      NgxPopperjsModule,
      FontAwesomeModule,
      BrowserModule,
      FullCalendarModule,
      NgxNotificationMsgModule,
    ]),
    provideAnimations(),
  ],
}).catch((err) => console.error(err));
