import { Component } from '@angular/core';
import { TranslationService } from '../translation.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-translate',
  templateUrl: './translate.component.html',
  styleUrls: ['./translate.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TranslateComponent {
  text: string = '';                      // Text to translate
  targetLanguage: string = 'english';          // Default target language code (English)
  translatedText: string | null = null;   // Holds the translated text
  errorMessage: string | null = null;     // Holds any error messages

  constructor(    private route: ActivatedRoute, // Inject ActivatedRoute
    private translationService: TranslationService, // Service for translation
  ) {}

  // Method to handle form submission for translation
  TranslatedText(): void {
    // Validate input before making the request
    if (!this.text.trim()) {
      this.errorMessage = 'Please enter text to translate.';
      return; // Exit if there's no text to translate
    }

    // Prepare the request data
    const requestData = {
      text: this.text,
      target_language: this.targetLanguage
    };

    // Call the translation service
    this.translationService.translate(requestData).subscribe({
      next: (response) => {
        // Safely extract translated text from response
        this.translatedText = response.translate_text || '';
        this.errorMessage = null; // Clear any previous error messages
      },
      error: (error) => {
        console.error('Error during translation:', error);
        this.translatedText = null; // Reset the translated text on error
        this.errorMessage = 'Failed to translate. Please try again.'; // Set an error message
      }
    });
  }
}
