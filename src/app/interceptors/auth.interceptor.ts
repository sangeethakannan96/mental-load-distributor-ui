import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { Router } from '@angular/router';

import {
  catchError,
  throwError
} from 'rxjs';

@Injectable()
export class AuthInterceptor
implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {

      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(

  catchError(error => {

    if (error.status === 401) {

      localStorage.clear();

      this.router.navigate(
        ['/login']
      );
    }

    return throwError(
      () => error
    );
  })
);
  }
}