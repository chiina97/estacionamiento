import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from 'src/environments/environment';
import { CurrentAccount } from '../models/current-account';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  authURL = environment.authURL; //esta en la carpeta de enviroment.ts

  constructor(private http: HttpClient) {}

  //post crea un usuario MODIFICADO PARA EL TOKEN
  public create(user: User): Observable<any> {
    return this.http.post<any>(this.authURL, user);
  }

  //obtener un usuarios
  public findById(id: number): Observable<User> {
    return this.http.get<User>(this.authURL + '/' + id);
  }

  public findCurrentAccountById(id: number): Observable<User> {
    return this.http.get<User>(this.authURL + '/currentAccount/' + id);
  }

  //update importe usuario
  public updateAmount(id: number, account: CurrentAccount): Observable<any> {
    return this.http.put<any>(this.authURL + '/account/' + id, account);
  }

  //MODIFICADO POR EL TOKEN
  public authenticate(usuario: any): Observable<JwtDTO> {
    //REVISAR SI HACE FALTA ENVIAR usuario:loginDTO
    return this.http.post<JwtDTO>(this.authURL + '/authenticate', usuario);
  }
  public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.authURL + '/refresh', dto);
  }
}
