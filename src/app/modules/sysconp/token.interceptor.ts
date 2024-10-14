import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, from, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './service/auth.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token :any = this.authService;

    // Clone the request and add the Authorization header
    let clonedRequest = req;
    if (token) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token.accessToken}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError(err => {
        // Se o erro for 401 (não autorizado), tente refrescar o token
        if (err.status === 401) {
          return this.authService.refreshAccessToken().pipe(
            switchMap(newToken => {
              if (newToken) {
                clonedRequest = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${token.accessToken}`
                  }
                });
                return next.handle(clonedRequest);
              }
              return throwError(err);
            })
          );
        }
        return throwError(err);
      })
    );
  }
}
