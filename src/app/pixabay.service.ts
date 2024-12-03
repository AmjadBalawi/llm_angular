import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PixabayService {
  private apiUrl = 'https://pixabay.com/api/';
  private apiKey = '47421482-71b5f635073f81c1978d777fc';  // Replace with your actual Pixabay API key

  constructor(private http: HttpClient) {}

  searchImages(query: string): Observable<any> {
    const params = new HttpParams().set('key', this.apiKey).set('q', query).set('image_type', 'photo');

    return this.http.get<any>(this.apiUrl, { params });
  }
}
