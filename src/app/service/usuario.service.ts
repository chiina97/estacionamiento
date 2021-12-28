import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { JwtDTO } from '../models/jwt-dto';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  authURL = environment.authURL; //esta en la carpeta de enviroment.ts

  constructor(private http:HttpClient) { }

  //obtener findAll usuarios
  public getAll():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.authURL);
  }

  //post crea un usuario MODIFICADO PARA EL TOKEN
  public create(usuario:Usuario):Observable<any>{
    return this.http.post<any>(this.authURL,usuario);
  }

  //obtener un usuarios
  public get(id:number):Observable<Usuario>{
    return this.http.get<Usuario>(this.authURL+'/'+id);
  }

   //update crea un usuario
  public update(id: number,usuario:Usuario):Observable<any>{
    return this.http.put<any>(this.authURL+"/"+id,usuario);
  }
  public debitar(id:number):Observable<any>{
    console.log("ejecutando debito");
    return this.http.post<any>(this.authURL+'/debitar',id);
  }
//MODIFICADO POR EL TOKEN
  public autenticar(usuario:any):Observable<JwtDTO>{ //REVISAR SI HACE FALTA ENVIAR usuario:loginDTO
    return this.http.post<JwtDTO>(this.authURL+'/autenticar',usuario);
  }
 public refresh(dto: JwtDTO): Observable<JwtDTO> {
    return this.http.post<JwtDTO>(this.authURL+'/refresh', dto);
  }

 
}
