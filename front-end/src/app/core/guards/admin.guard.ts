import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AuthorizationService } from '../services/authorization.service';
import { roles } from '../сonstants/constants';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authorizationService.getUserRole()
      .pipe(
        take(1),
        map((response: { role: string }) => {
          if (response.role === roles.admin) {
            return true;
          }
          this.router.navigate(['/']);
          return false;
        }),
        catchError(e => {
          this.authorizationService.redirectToLoginForm();
          return of(false);
        })
      );
  }
}
