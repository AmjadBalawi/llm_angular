import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestinationActivitiesService {
  private apiUrl = 'https://mml-fastapi-7.onrender.com/destination-activities';

  constructor(private http: HttpClient) {}

  getActivities(destination: string): Observable<any> {
    const params = { destination };
    return this.http.get<any>(this.apiUrl, { params });
  }
}
