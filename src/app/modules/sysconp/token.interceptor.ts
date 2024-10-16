import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from './service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

   removeDuplicateUrl(url: string): string {
    const regex = /(https?:\/\/[^\s\/]+)(\/\1)+/g;
    return url.replace(regex, '$1$2');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: any = this.authService;
    let clonedRequest = req;

    // const apiUrl = 'https://sysconp-api-1.onrender.com';
    //  let modifiedUrl = this. removeDuplicateUrl(`${apiUrl}${req.url}`) ;
    if (token) {
      clonedRequest = req.clone({
        // url: modifiedUrl,
        setHeaders: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`
        }
      });
    } else {
      clonedRequest = req.clone({
        // url: modifiedUrl,
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError(err => {
        if (err.status === 401) {
          return this.authService.refreshAccessToken().pipe(
            switchMap(newToken => {
              if (newToken) {
                clonedRequest = req.clone({
                  // url: modifiedUrl,
                  setHeaders: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`
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
