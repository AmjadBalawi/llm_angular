import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HiddenGemsService {
  private apiUrl = 'https://fastapi-goexplore.vercel.app/hidden-gems'; // Update with your API base URL if deployed

  constructor(private http: HttpClient) {}

  fetchHiddenGems(location: string): Observable<any> {
    const params = new HttpParams().set('location', location);
    return this.http.get(this.apiUrl, { params });
  }
}
