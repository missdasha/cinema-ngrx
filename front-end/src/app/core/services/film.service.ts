import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Film } from '../models/film.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  pathToFilms = 'films/';
  selectQuery = '?select=';
  pathToNewestFilms = 'newest';
  pathToNewFilm = 'new';

  constructor(private http: HttpClient) { }

  postFilm(form): Observable<{ message: string, film: Film }> {
    return this.http.post<{ message: string, film: Film }>(`${environment.baseUrl}${this.pathToFilms}${this.pathToNewFilm}`, form);
  }

  getFilmsFullInfo(): Observable<Film[]> {
    return this.http.get<Film[]>(`${environment.baseUrl}${this.pathToFilms}`);
  }

  getFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${environment.baseUrl}${this.pathToFilms}${this.selectQuery}title`);
  }

  getFilmsForSlider(): Observable<Film[]> {
    return this.http.get<Film[]>(`${environment.baseUrl}${this.pathToFilms}${this.selectQuery}title,genres,age,imageSrc`);
  }

  getFilmsForAfisha(): Observable<Film[]> {
    return this.http.get<Film[]>(`${environment.baseUrl}${this.pathToFilms}${this.selectQuery}title,genres,age,imageSrc,seances`);
  }

  getFilmByIdAndQuery(id): Observable<Film> {
    return this.http.get<Film>(`${environment.baseUrl}${this.pathToFilms}${id}${this.selectQuery}imageSrc,duration,title`);
  }

  getFilmById(id): Observable<Film> {
    return this.http.get<Film>(`${environment.baseUrl}${this.pathToFilms}${id}`);
  }

  getNewestFilms(): Observable<Film[]> {
    return this.http.get<Film[]>(`${environment.baseUrl}${this.pathToFilms}${this.pathToNewestFilms}`);
  }
}
