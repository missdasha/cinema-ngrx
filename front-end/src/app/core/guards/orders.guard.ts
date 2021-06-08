import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthorizationService } from '../services/authorization.service';

@Injectable()
export class OrdersGuard implements CanActivate {
  constructor(private authorizationService: AuthorizationService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    return this.authorizationService.getIsUserAuthorized()
      .pipe(
        take(1),
        map(value => {
          if (value) {
            return true;
          }
          this.authorizationService.redirectToLoginForm();
          return false;
        })
      );
  }
}
