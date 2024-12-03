import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private apiUrl = 'http://127.0.0.1:8000/api/chat-completion';

  constructor(private http: HttpClient) {}

  getChatCompletion(messages: any, model: string): Observable<any> {
    const body = { messages, model };
    return this.http.post<any>(this.apiUrl, body);
  }
}
