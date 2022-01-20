import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { History } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  historyURL="http://localhost:8080/history"; 

  constructor(private http:HttpClient) {  }



  public findAllById(id:number):Observable<History[]>{
    return this.http.get<History[]>(this.historyURL+'/'+id);
  }

 
}
