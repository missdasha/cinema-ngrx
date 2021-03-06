import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, ReplaySubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../../features/client-portal/models/user.model';
import { messages, roles } from '../сonstants/constants';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  pathToLogin = 'auth/login';
  pathToRegistration = 'auth/register';
  pathToLogOut = 'auth/logout';
  pathToValidation = 'auth/validate_token';
  pathToRoleCheck = 'auth/check_role';
  protectedRoutes = ['/orders', '/admin'];

  private userAuthorizationSubject$ = new ReplaySubject<boolean>(1);
  isUserAuthorized$ = this.userAuthorizationSubject$.asObservable();

  private loginFormSubject$ = new BehaviorSubject<boolean>(true);
  isLogin$ = this.loginFormSubject$.asObservable();

  private modalWindowVisibilitySubject$ = new BehaviorSubject<boolean>(false);
  isModalWindowVisible$ = this.modalWindowVisibilitySubject$.asObservable();

  getIsUserAuthorized(): Observable<boolean> {
    return this.isUserAuthorized$;
  }

  getIsLogin(): Observable<boolean> {
    return this.isLogin$;
  }

  getIsModalWindowVisible(): Observable<boolean> {
    return this.isModalWindowVisible$;
  }

  constructor(private http: HttpClient, private router: Router ) {
    this.http.get(`${environment.baseUrl}${this.pathToValidation}`)
      .subscribe(
        () => {
          this.setIsUserAuthorized(true);
        },
        (e) => {
          console.error(e);
          this.setIsUserAuthorized(false);
        }
      );
  }

  setIsUserAuthorized(isUserAuthorized: boolean) {
    this.userAuthorizationSubject$.next(isUserAuthorized);
    if (!isUserAuthorized) {
      localStorage.removeItem('token');
      if (this.protectedRoutes.includes(this.router.url)) {
        this.router.navigate(['/']);
      }
    }
  }

  getUserRole(): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(`${environment.baseUrl}${this.pathToRoleCheck}`);
  }

  setIsLogin(isLogin: boolean) {
    this.loginFormSubject$.next(isLogin);
  }

  redirectToLoginForm() {
    this.router.navigate(['/']);
    this.setModalWindowVisibility(true);
  }

  setModalWindowVisibility(isModalWindowVisible: boolean) {
    this.modalWindowVisibilitySubject$.next(isModalWindowVisible);
  }

  registerUser(user: User) {
    this.http.post(`${environment.baseUrl}${this.pathToRegistration}`, user)
      .subscribe(
        () => {
          this.setIsLogin(true);
          alert('Вы успешно зарегистрированы');
        },
        (e) => {
          if (e.error) {
            alert(messages[e.error.message]);
          }
          else {
            alert('Извините, произошла ошибка');
            console.error(e);
          }
        }
      );
  }

  login(user: User) {
    this.http.post<{ token: string, name: string, id: string }>(`${environment.baseUrl}${this.pathToLogin}`, user)
      .subscribe(
        (info: { token: string, name: string, id: string }) => {
          localStorage.setItem('id', info.id);
          localStorage.setItem('token', info.token);
          this.setIsUserAuthorized(true);
          this.setModalWindowVisibility(false);
          alert(`Добро пожаловать, ${info.name}`);
        },
        (e) => {
          if (e.error) {
            alert(messages[e.error.message]);
          }
          else {
            alert('Извините, произошла ошибка');
          }
        }
      );
  }

  logOut() {
    this.http.get(`${environment.baseUrl}${this.pathToLogOut}`)
      .subscribe(
        () => {
          this.setIsUserAuthorized(false);
        }
      );
  }
}
