import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

const TOKEN_KEY = 'AuthToken';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  roles: Array<string> = [];

  constructor(private router: Router) {}

  public setToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
  }
  //obtiene el telefono del usuario(user)
  public getUser(): any {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1]; //acá estan los datos del usuario
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const phone = values.sub;
    return phone;
  }

  public getIdUser(): any {
    if (!this.isLogged()) {
      return null;
    }
    const token = this.getToken();
    const payload = token.split('.')[1]; //acá estan los datos del usuario
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const id = values.jti; //obtiene el id
    return id;
  }

  public isAdmin(): boolean {
    if (!this.isLogged()) {
      return false;
    }
    const token = this.getToken();
    const payload = token.split('.')[1]; //acá estan los datos del usuario
    const payloadDecoded = atob(payload);
    const values = JSON.parse(payloadDecoded);
    const roles = values.roles;
    if (roles.indexOf('ROLE_ADMIN') < 0) {
      return false;
    }
    return true;
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
  public logOut(): void {
    window.localStorage.clear();
    this.router.navigate(['/login']);
    // window.location.reload();
  }
}
