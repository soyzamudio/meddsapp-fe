import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { importProvidersFrom, LOCALE_ID } from '@angular/core';
import { bootstrapApplication, BrowserModule } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  PreloadAllModules,
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
registerLocaleData(localeEs);

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
          withPreloading(PreloadAllModules)
        ),
        importProvidersFrom([
          NgxPopperjsModule,
          FontAwesomeModule,
          BrowserModule,
          FullCalendarModule,
          NgxNotificationMsgModule,
        ]),
        provideAnimations(),
        { provide: LOCALE_ID, useValue: 'es' },
        // { provide: RouteReuseStrategy, useClass: Router }
      ],
    }).catch((err) => console.error(err))
);
