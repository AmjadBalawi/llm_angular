import { Component } from '@angular/core';
import { CulturalTipsService } from '../cultural-tips.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'; // Include RouterModule if needed

@Component({
  selector: 'app-cultural-tips',
  templateUrl: './cultural-tips.component.html',
  styleUrls: ['./cultural-tips.component.css'],
  standalone: true, // Ensure this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule] // Add CommonModule and FormsModule
})
export class CulturalTipsComponent {
  location: string = '';
  culturalTips: SafeHtml | null = null;
  errorMessage: string | null = null;
  isLoading: boolean = false;

  constructor(private culturalTipsService: CulturalTipsService, private sanitizer: DomSanitizer) {}

  getCulturalTips(): void {
    if (!this.location) {
      this.errorMessage = 'Please enter a destination.'; // Changed property name
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.culturalTips = null;

    this.culturalTipsService.getCulturalTips(this.location).subscribe({
      next: (response) => {
        const formattedActivities = response.cultural_tips // Assuming the response key for tips
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        this.culturalTips = this.sanitizer.bypassSecurityTrustHtml(formattedActivities);
        this.isLoading = false; // Ensure loading is false after receiving the response
      },
      error: (error) => {
        this.errorMessage = `Error: ${error.message}`; // Update error message
        this.isLoading = false; // Ensure loading is false on error
      },
    });
  }
}
