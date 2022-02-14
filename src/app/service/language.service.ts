import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  languageURL = 'http://localhost:8080/language';
  constructor(private http: HttpClient) {}

  public getLanguage(): Observable<any> {
    return this.http.get<any>(this.languageURL);
  }
}
