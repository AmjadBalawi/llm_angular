import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HiddenGemsService {
  private baseApiUrl = 'https://fastapi-goexplore.vercel.app'; // Replace with your deployed API base URL if applicable
  private googleapiurl = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyDMgo7wWk_Oq7tsvPxDm_rHsBqr_MX0enw&cx=23258a598f4664fde&searchType=image'; // Google Custom Search API URL

  constructor(private http: HttpClient) {}

  /**
   * Fetch hidden gems for a given location.
   * @param location - The location to search for hidden gems.
   * @returns Observable containing hidden gems data and images.
   */
  fetchHiddenGems(location: string): Observable<{ hidden_gems: string; images?: string[] }> {
    const url = `${this.baseApiUrl}/hidden-gems`;
    const params = new HttpParams().set('location', location);
    return this.http.get<{ hidden_gems: string; images?: string[] }>(url, { params });
  }

  /**
   * Search for images related to a given query.
   * @param query - The search term for the images.
   * @returns Observable containing an array of image URLs.
   */
  searchImages(query: string): Observable<{ images: string[] }> {
    const url = this.googleapiurl;
    const params = new HttpParams().set('q', query);

    return this.http.get<any>(url, { params }).pipe(
      map((response) => {
        // Filter only valid image URLs with extensions like .jpg, .png, .gif, etc.
        const validImageFormats = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
        const images = response.items?.map((item: any) => item.link).filter((imageUrl: string) => {
          const extension = imageUrl.split('.').pop()?.toLowerCase();
          return validImageFormats.includes(extension || '');
        }) || [];
        
        return { images };
      })
    );
  }
}
