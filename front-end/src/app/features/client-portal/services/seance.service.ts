import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SeanceService {
  pathToSeances = 'seances/';
  pathToNewSeance = 'new';

  constructor(private http: HttpClient) { }
}
