import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

interface TranslationRequest {
  text: string;
  target_language: string;
}

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private apiUrl = 'https://fastapi-goexplore.vercel.app/translate'; // Update this URL if needed

  constructor(private http: HttpClient) {}

  translate(request: TranslationRequest): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(this.apiUrl, request, { headers });
  }
}
