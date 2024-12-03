import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HiddenGemsComponent } from '../app/hidden-gems/hidden-gems.component'; // Only declare non-standalone components
import { DestinationActivitiesComponent } from '../app/destination-activities/destination-activities.component'; // Only declare non-standalone components

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: '/hidden-gems', pathMatch: 'full' },
      { path: 'hidden-gems', component: HiddenGemsComponent },
      { path: 'destination-activities', component: DestinationActivitiesComponent } // Include directly in routes
    ])
  ],
  providers: [],
  bootstrap: [] // Do not bootstrap AppComponent here, it will be handled in main.ts
})
export class AppModule {}
