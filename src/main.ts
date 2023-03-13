import { importProvidersFrom, isDevMode } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  withEnabledBlockingInitialNavigation,
  withInMemoryScrolling,
  withPreloading,
  withRouterConfig,
} from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FullCalendarModule } from '@fullcalendar/angular';
import { NgxNotificationMsgModule } from 'ngx-notification-msg';
import { NgxPopperjsModule } from 'ngx-popperjs';
import { APP_ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { PreloadService } from './app/shared/services/preload.service';
import { ServiceWorkerModule } from '@angular/service-worker';


setTimeout(() =>
  bootstrapApplication(AppComponent, {
    providers: [
      provideRouter(
        APP_ROUTES,
        withInMemoryScrolling({
          scrollPositionRestoration: 'disabled',
        }),
        withEnabledBlockingInitialNavigation(),
        withRouterConfig({
          paramsInheritanceStrategy: 'always',
          onSameUrlNavigation: 'reload',
        }),
        withPreloading(PreloadService)
      ),
      importProvidersFrom([
        NgxPopperjsModule,
        FontAwesomeModule,
        BrowserModule,
        FullCalendarModule,
        NgxNotificationMsgModule,
        ServiceWorkerModule.register('ngsw-worker.js', {
          enabled: !isDevMode(),
          // Register the ServiceWorker as soon as the application is stable
          // or after 30 seconds (whichever comes first).
          registrationStrategy: 'registerWhenStable:30000'
        })
      ]),
      provideAnimations(),
      // { provide: RouteReuseStrategy, useClass: Router }
    ],
  }).catch((err) => console.error(err))
);
