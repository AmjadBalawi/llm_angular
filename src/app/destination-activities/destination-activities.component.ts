import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Import ActivatedRoute
import { DestinationActivitiesService } from '../destination-activities.service';
import { CommonModule } from '@angular/common'; // Import CommonModule for *ngFor
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { PixabayService } from '../pixabay.service';
import { RouterModule } from '@angular/router'; // Include RouterModule if needed

@Component({
  selector: 'app-destination-activities',
  templateUrl: './destination-activities.component.html',
  styleUrls: ['./destination-activities.component.css'],
  standalone: true, // Ensure this is a standalone component
  imports: [CommonModule, FormsModule, RouterModule] // Add CommonModule and FormsModule
})
export class DestinationActivitiesComponent implements OnDestroy {
  destination: string = '';
  activities: SafeHtml | null = null;
  error: string = '';
  isLoading: boolean = false;
  images: string[] = [];
  currentImageIndex: number = 0;
  slideInterval: any;

  constructor(
    private route: ActivatedRoute, // Inject ActivatedRoute
    private destinationActivitiesService: DestinationActivitiesService,
    private pixabayService: PixabayService,
    private sanitizer: DomSanitizer
  ) {
    // Activate route parameters on component initialization
    this.route.paramMap.subscribe(params => {
      this.destination = params.get('destination') || '';
      if (this.destination) {
        this.fetchActivities(); // Fetch activities when destination is set
      }
    });
  }

  // Fetch activities and images based on destination
  fetchActivities() {
    // Reset states
    this.error = '';
    this.activities = null;
    this.images = [];

    // Validation
    if (!this.destination.trim()) {
      this.error = 'Please enter a valid destination.';
      return;
    }

    this.isLoading = true;

    // Fetch activities
    this.destinationActivitiesService.getActivities(this.destination).subscribe({
      next: (response) => {
        const formattedActivities = response.activities
          .replace(/\n/g, '<br>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        this.activities = this.sanitizer.bypassSecurityTrustHtml(formattedActivities);

        // Fetch images from Pixabay
        this.pixabayService.searchImages(this.destination).subscribe({
          next: (imageResponse) => {
            if (imageResponse.hits.length > 0) {
              this.images = imageResponse.hits.map((hit: any) => hit.webformatURL);
              this.startSlideshow();
            } else {
              this.error = 'No images found for this destination.';
            }
          },
          error: () => {
            this.error = 'Failed to fetch images from Pixabay.';
          }
        });

        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to fetch activities. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }

  // Start the automatic slideshow
  startSlideshow() {
    this.slideInterval = setInterval(() => {
      this.nextImage();
    }, 3000);
  }

  // Function to go to the next image in the slideshow
  nextImage() {
    if (this.currentImageIndex < this.images.length - 1) {
      this.currentImageIndex++;
    } else {
      this.currentImageIndex = 0; // Loop back to the first image
    }
  }

  // Clean up interval when the component is destroyed
  ngOnDestroy() {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
}
