import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feriado } from '../models/feriado';

@Injectable({
  providedIn: 'root'
})
export class FeriadoService {
  feriadoURL="http://localhost:8080/feriado"; 

  constructor(private http:HttpClient) { }

  create(feriado:Feriado):Observable<Feriado>{
    return this.http.post<Feriado>(this.feriadoURL,feriado);
  }

  public getAll():Observable<Feriado[]>{
    return this.http.get<Feriado[]>(this.feriadoURL);
  }

  public getByFecha(fecha:String):Observable<any>{
    return this.http.get<any>(this.feriadoURL+'/'+fecha);
  }


}
