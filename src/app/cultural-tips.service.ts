import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CulturalTipsService {
  private apiUrl = 'https://fastapi-goexplore.vercel.app/cultural-tips'; // Update with your API base URL if deployed

  constructor(private http: HttpClient) {}

  getCulturalTips(location: string): Observable<any> {
    const params = new HttpParams().set('location', location);
    return this.http.get(this.apiUrl, { params });
  }
}

