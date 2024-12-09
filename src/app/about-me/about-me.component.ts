import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Include RouterModule if needed
@Component({
  selector: 'app-about-me',
  templateUrl: './about-me.component.html',
  styleUrls: ['./about-me.component.css'],
  standalone: true, // Ensure this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule] // Add CommonModule and FormsModule
})
export class AboutMeComponent {
  // Add any necessary data or methods here
  name = 'Amjad Balawi';
  bio = 'software and AI expert';
}
