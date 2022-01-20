import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { TokenService } from '../service/token.service';
import { UserService } from '../service/user.service';
import { catchError, concatMap } from 'rxjs/operators';
import { JwtDTO } from './../models/jwt-dto';

@Injectable({
  providedIn: 'root',
})
export class UserInterceptorService implements HttpInterceptor {
  constructor(
    private tokenService: TokenService,
    private userService: UserService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!this.tokenService.isLogged()) {
      return next.handle(req);
    }

    let intReq = req;
    const token = this.tokenService.getToken();

    intReq = this.addToken(req, token);

    return next.handle(intReq).pipe(
      catchError((err: HttpErrorResponse) => {
        if (err.status === 401) {
          const dto: JwtDTO = new JwtDTO(this.tokenService.getToken());
          return this.userService.refresh(dto).pipe(
            concatMap((data: any) => {
              this.tokenService.setToken(data.token);
              intReq = this.addToken(req, data.token);
              return next.handle(intReq);
            })
          );
        } else {
          return throwError(err);
        }
      })
    );
  }
  private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + token),
    });
  }
}

export const interceptorProvider = [
  { provide: HTTP_INTERCEPTORS, useClass: UserInterceptorService, multi: true },
];
