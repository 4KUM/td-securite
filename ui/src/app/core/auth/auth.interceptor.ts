import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { API } from '../api/banque';
import { AuthService } from './auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!req.url.startsWith(API)) {
    return next(req);
  }

  const dejaUnEntete = req.headers.has('Authorization');
  const entete = auth.enteteAuthorization();
  if (!dejaUnEntete && entete) {
    req = req.clone({ setHeaders: { Authorization: entete } });
  }

  return next(req).pipe(
    catchError((erreur: unknown) => {
      if (erreur instanceof HttpErrorResponse && erreur.status === 401 && !dejaUnEntete) {
        auth.deconnecter();
        router.navigate(['/login'], { queryParams: { retour: router.url } });
      }
      return throwError(() => erreur);
    }),
  );
};
