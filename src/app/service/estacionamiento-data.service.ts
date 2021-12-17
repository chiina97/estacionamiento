import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EstacionamientoData } from '../models/estacionamiento-data';

@Injectable({
  providedIn: 'root'
})
export class EstacionamientoDataService {
  estacionamientoURL="http://localhost:8080/estacionamientoData"; 

  constructor(private http:HttpClient) { }
  
   create(estacionamiento:EstacionamientoData):Observable<EstacionamientoData>{
    return this.http.post<EstacionamientoData>(this.estacionamientoURL,estacionamiento);
  }

 
  findById(id:number):Observable<EstacionamientoData>{
    return this.http.get<EstacionamientoData>(this.estacionamientoURL+'/'+id);
  }

   update(id: number, estacionamiento: EstacionamientoData):Observable<any>{
    return this.http.put<any>(this.estacionamientoURL+'/'+id,estacionamiento);
  }
}
