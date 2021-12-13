import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ciudad } from '../models/ciudad';

@Injectable({
  providedIn: 'root'
})
export class CiudadService {

  ciudadURL="http://localhost:8080/ciudad"; 
  constructor(private http:HttpClient) { }

  //obtener findAll patentes del usuario con id logueada
  getDataCiudad():Observable<Ciudad[]>{
    return this.http.get<Ciudad[]>(this.ciudadURL);
  }
 
}
