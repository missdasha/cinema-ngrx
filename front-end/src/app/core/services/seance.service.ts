import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Seance } from '../models/seance.model';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  pathToSeances = 'seances/';
  pathToNewSeance = 'new';

  constructor(private http: HttpClient) { }

  postSeance(seance: Seance): Observable<{ message: string, seance: Seance }> {
    return this.http.post<{ message: string, seance: Seance }>(`${environment.baseUrl}${this.pathToSeances}${this.pathToNewSeance}`, seance);
  }

  getSeance(id: string): Observable<Seance> {
    return this.http.get<Seance>(`${environment.baseUrl}${this.pathToSeances}${id}`);
  }
}
