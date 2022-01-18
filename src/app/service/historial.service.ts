import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Historial } from '../models/historial';

@Injectable({
  providedIn: 'root'
})
export class HistorialService {
  historialURL="http://localhost:8080/historial"; 

  constructor(private http:HttpClient) {  }


  create(historial:Historial):Observable<Historial>{
    return this.http.post<Historial>(this.historialURL,historial);
  }


  public findAllById(id:number):Observable<Historial[]>{
    return this.http.get<Historial[]>(this.historialURL+'/'+id);
  }

 
}
