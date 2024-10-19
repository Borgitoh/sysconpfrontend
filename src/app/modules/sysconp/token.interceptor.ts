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
    const accessToken = localStorage.getItem('accessToken'); // Obtenha o token diretamente
    let clonedRequest = req;

    // Caso o token exista, clone a requisição adicionando o cabeçalho Authorization
    if (accessToken) {
      clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(clonedRequest).pipe(
      catchError(err => {
        // if (err.status === 401) {
        //   // Se o token for inválido (401), tente atualizá-lo
        //   return this.authService.refreshAccessToken().pipe(
        //     switchMap(newToken => {
        //       if (newToken) {
        //         // Atualize o token no localStorage se a atualização for bem-sucedida
        //         localStorage.setItem('accessToken', newToken);

        //         // Clone novamente a requisição com o novo token
        //         clonedRequest = req.clone({
        //           setHeaders: {
        //             Authorization: `Bearer ${newToken}`
        //           }
        //         });

        //         return next.handle(clonedRequest); // Tente novamente a requisição
        //       }
        //       return throwError(err); // Se a atualização falhar, lance o erro
        //     })
        //   );
        // }
        return throwError(err); // Para outros erros, apenas lance o erro
      })
    );
  }
}
