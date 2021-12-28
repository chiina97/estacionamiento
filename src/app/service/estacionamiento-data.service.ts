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


  findByPatenteIniciada(patente:String):Observable<EstacionamientoData>{
    return this.http.get<EstacionamientoData>(this.estacionamientoURL+'/patente/'+patente);
  }


   update(id: number, estacionamiento: EstacionamientoData):Observable<any>{
    return this.http.put<any>(this.estacionamientoURL+'/'+id,estacionamiento);
  }

  public finalizarEstacionamiento(id:number): Observable<any>{
    return this.http.get<any>(this.estacionamientoURL + '/finalizarEstacionamiento/'+id);
  }


  public getEstado(id:number):Observable<any>{
    return this.http.get<any>(this.estacionamientoURL + '/getEstado/'+id);
  }
}
