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

  postSeance(seance: Seance): Observable<{ message: string, data: Seance }> {
    return this.http.post<{ message: string, data: Seance }>(`${environment.baseUrl}${this.pathToSeances}${this.pathToNewSeance}`, seance);
  }
}
