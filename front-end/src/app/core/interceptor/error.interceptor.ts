import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retry(1),
        catchError((error: HttpErrorResponse) => {
          let message;
          if (error.error instanceof ErrorEvent) {
            message = `Client side error: ${error.error.message}`;
          }
          else {
            if (error.status === 401) {
              const auth = this.injector.get(AuthorizationService);
              auth.setIsUserAuthorized(false);
            }
            if (error.error.message) {
              message = error;
            }
            else {
              message = `Server side error: ${error.status},  Message: ${error.message}`;
            }
          }
          return throwError(message);
        })
      )
  }
}
