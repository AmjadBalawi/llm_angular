import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HiddenGemsService } from '../hidden-gems.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute } from '@angular/router'; // Include ActivatedRoute if needed

@Component({
  selector: 'app-hidden-gems',
  templateUrl: './hidden-gems.component.html',
  styleUrls: ['./hidden-gems.component.css'],
  imports: [CommonModule, FormsModule, RouterModule] // Add necessary imports here
})
export class HiddenGemsComponent {
  destination: string = '';
  activities: SafeHtml | null = null;

  images: string[] = [];
  isLoading: boolean = false;
  error: string = '';
  currentImageIndex: number = 0;

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private hiddenGemsService: HiddenGemsService,
    private sanitizer: DomSanitizer,
  ) {}

  fetchActivities(): void {
    if (!this.destination) {
      this.error = 'Please enter a destination.';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.activities = null;
    this.images = [];

    this.hiddenGemsService.fetchHiddenGems(this.destination).subscribe({
      next: (response) => {
        const formattedActivities = response.hidden_gems
        .replace(/\n/g, '<br>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

         this.activities = this.sanitizer.bypassSecurityTrustHtml(formattedActivities);
        // Assume response also includes images if available
        this.images = response.images || [];
        this.isLoading = false;
      },
      error: (error) => {
        this.error = `Error: ${error.message}`;
        this.isLoading = false;
      },
    });
  }
}
