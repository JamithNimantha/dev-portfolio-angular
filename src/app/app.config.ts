import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {provideHttpClient, withFetch} from "@angular/common/http";
import {NgOptimizedImage} from "@angular/common";
import { provideClientHydration, withEventReplay, withNoIncrementalHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({eventCoalescing: true},),
      provideHttpClient(withFetch()),
      provideRouter(routes),
      importProvidersFrom(NgOptimizedImage), provideClientHydration(withEventReplay(), withNoIncrementalHydration())
  ]
};
