import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HiddenGemsService } from '../hidden-gems.service';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hidden-gems',
  templateUrl: './hidden-gems.component.html',
  styleUrls: ['./hidden-gems.component.css'],
  imports: [CommonModule, FormsModule, RouterModule],
})
export class HiddenGemsComponent {
  destination: string = '';
  activities: SafeHtml | null = null;
  images: string[] = [];
  isLoading: boolean = false;
  error: string = '';
  currentImageIndex: number = 0;
  imageSearchTerm: string = '';
  isImageLoading: boolean = false;
  imageError: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private hiddenGemsService: HiddenGemsService,
    private sanitizer: DomSanitizer
  ) {}

  // Fetch hidden gems and associated images
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
      next: (response: { hidden_gems: string; images?: string[] }) => {
        const formattedActivities = response.hidden_gems
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        this.activities = this.sanitizer.bypassSecurityTrustHtml(formattedActivities);
        this.images = response.images || [];
        this.isLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.error = `Error: ${error.message}`;
        this.isLoading = false;
      },
    });
  }

  // Fetch images for the given search term
  fetchImages(): void {
    if (!this.imageSearchTerm) {
      this.imageError = 'Please enter an image search term.';
      return;
    }

    this.isImageLoading = true;
    this.imageError = null;

    this.hiddenGemsService.searchImages(this.imageSearchTerm).subscribe({
      next: (response: { images: string[] }) => {
        this.images = response.images || [];
        if (this.images.length === 0) {
          this.imageError = 'No images found for the given search term.';
        }
        this.isImageLoading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.imageError = `Error: ${error.message}`;
        this.isImageLoading = false;
      },
    });
  }

  // Show next image in the array
  nextImage(): void {
    if (this.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.images.length;
    }
  }

  // Show previous image in the array
  previousImage(): void {
    if (this.images.length > 0) {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.images.length) % this.images.length;
    }
  }
}
