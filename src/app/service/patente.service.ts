import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Patente } from '../models/patente';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class PatenteService {

  patenteURL = environment.patenteURL; //patenteUrl=localhost:8080/usuario
  constructor(private http:HttpClient) { }

  //obtener findAll patentes del usuario con id logueada
  getAll(id:number):Observable<Patente[]>{
    return this.http.get<Patente[]>(this.patenteURL+'/usuario/'+id);
  }
 
  //post crea una patente
  create(patente:Patente):Observable<Patente>{
    return this.http.post<Patente>(this.patenteURL,patente);
  }

  //obtener una patente
  findById(id:number):Observable<Patente>{
    return this.http.get<Patente>(this.patenteURL+'/'+id);
  }

   //update una patente REVISAR
   update(id: number, patente: Patente):Observable<any>{
    return this.http.put<any>(this.patenteURL+'/'+id,patente);
  }
//elimino una patente 
  delete(id:number):Observable<Patente>{
  return this.http.delete<Patente>(this.patenteURL+'/'+id);
}

 
}
