import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component'; // Ensure this is a standalone component
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { environment } from './environments/environment';
import { DestinationActivitiesComponent } from './app/destination-activities/destination-activities.component'; // Define APP_ROUTES if needed
import { HiddenGemsComponent } from './app/hidden-gems/hidden-gems.component'; // Define APP_ROUTES if needed
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module'; // Import your app module
import { enableProdMode } from '@angular/core';
import { TranslateComponent } from './app/translate-service/translate.component'; // Define APP_ROUTES if needed
import { CulturalTipsComponent } from './app/cultural-tips/cultural-tips.component'; // Define APP_ROUTES if needed
import { WeatherComponent } from './app/weather/weather.component'; // Define APP_ROUTES if needed
import { AboutMeComponent } from './app/about-me/about-me.component'; // Import the new component

if (environment.production) {
  enableProdMode(); // Enable production mode if specified
}

platformBrowserDynamic()
  .bootstrapModule(AppModule) // Bootstrap the NgModule
  .catch(err => console.error(err));

if (environment.production) {
  enableProdMode(); 
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(HttpClientModule), // Import any necessary services
    provideRouter([
      { path: '', redirectTo: '/hidden-gems', pathMatch: 'full' },
      { path: 'hidden-gems', component: HiddenGemsComponent },
      { path: 'destination-activities', component: DestinationActivitiesComponent },
      { path: 'translate-service', component: TranslateComponent },
      { path: 'cultural-tips', component: CulturalTipsComponent },
      { path: 'weather', component: WeatherComponent },
      { path: 'about-me', component: AboutMeComponent }


    ]) // Define your routes here instead of in the app module
  ]
}).catch(err => console.error(err));
