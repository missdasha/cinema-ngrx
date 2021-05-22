import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Cinema } from '../models/cinema.model';
import { Service } from '../models/service.model';
import { messages } from '../сonstants/constants';

@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  pathToCinemas = 'cinemas/';
  pathToNewCinema = 'new';
  selectQuery = '?select=';

  constructor(private http: HttpClient) { }

  postCinema(cinema: Cinema): Observable<{ message: string, data: Cinema }> {
    const body = {
      ...cinema,
      additionalServices: cinema.additionalServices.map((service: Service) => service._id)
    };
    return this.http.post<{ message: string, data: Cinema }>(`${environment.baseUrl}${this.pathToCinemas}${this.pathToNewCinema}`, body);
  }

  getCinemas(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${environment.baseUrl}${this.pathToCinemas}${this.selectQuery}name,city,address,-_id`);
  }

  getCinemasForAdmin(): Observable<Cinema[]> {
    return this.http.get<Cinema[]>(`${environment.baseUrl}${this.pathToCinemas}${this.selectQuery}name,city,address,halls`);
  }

  getCinemaByName(name): Observable<Cinema> {
    return this.http.get<Cinema>(`${environment.baseUrl}${this.pathToCinemas}${name}`);
  }
}
