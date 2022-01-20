import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Patent } from '../models/patent';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PatentService {
  patentURL = environment.patentURL; //patentURL=localhost:8080/usuario
  constructor(private http: HttpClient) {}

  //obtener findAll Patents del usuario con id logueada
  getAll(id: number): Observable<Patent[]> {
    return this.http.get<Patent[]>(this.patentURL + '/user/' + id);
  }

  //post crea una Patent
  create(patent: Patent): Observable<Patent> {
    return this.http.post<Patent>(this.patentURL, patent);
  }

  //obtener una Patent
  findById(id: number): Observable<Patent> {
    return this.http.get<Patent>(this.patentURL + '/' + id);
  }

  //update una Patent REVISAR
  update(id: number, patent: Patent): Observable<any> {
    return this.http.put<any>(this.patentURL + '/' + id, patent);
  }
  //elimino una Patent
  delete(id: number): Observable<Patent> {
    return this.http.delete<Patent>(this.patentURL + '/' + id);
  }
}
