import { ApplicationConfig } from '@angular/core';
import { provideRouter, withDisabledInitialNavigation } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes,withDisabledInitialNavigation()),
    provideAnimations(),
  ],
};
