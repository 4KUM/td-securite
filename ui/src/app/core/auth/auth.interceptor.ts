import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API } from '../api/banque';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (httpRequest, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!httpRequest.url.startsWith(API)) {
    return next(httpRequest);
  }

  const headers: Record<string, string> = {};

  const dejaUnEntete = httpRequest.headers.has('Authorization');
  const basic = authService.basic();
  if (!dejaUnEntete && basic) {
    headers['Authorization'] = 'Basic ' + btoa(basic);
  }

  return next(httpRequest.clone({ setHeaders: headers })).pipe(
    catchError((erreur: unknown) => {
      if (erreur instanceof HttpErrorResponse && erreur.status === 401 && !dejaUnEntete) {
        authService.deconnecter();
        router.navigate(['/login'], { queryParams: { retour: router.url } });
      }
      return throwError(() => erreur);
    })
  );
};
