import { APP_ROUTES } from './app/app-routing.module';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from "@angular/platform-browser";
import { importProvidersFrom } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(RouterModule.forRoot(APP_ROUTES)),
    importProvidersFrom(FontAwesomeModule),
  ],
}).catch(err => console.error(err));
