import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cinema } from '../models/cinema.model';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  pathToCinemas = 'cinemas/';
  pathToNewCinema = 'new';

  constructor(private http: HttpClient) { }

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${environment.baseUrl}${this.pathToCinemas}`);
  }

  getCinemaByName(name): Observable<Cinema> {
    return this.http.get<Cinema>(`${environment.baseUrl}${this.pathToCinemas}${name}`);
  }
}
