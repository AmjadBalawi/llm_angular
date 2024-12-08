import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // Importing RouterModule
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [RouterModule,CommonModule, FormsModule]
})
export class AppComponent {
  title = 'GoExplore';
  isDonationSectionVisible: boolean = true;

  // Method to hide the donation section
  closeDonationSection() {
    this.isDonationSectionVisible = false;
    console.log('Donation section closed'); // Debugging log
  }
}
