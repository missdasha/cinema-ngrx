import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service } from '../models/service.model.js';

@Injectable({
  providedIn: 'root'
})
export class AdditionalService {
  pathToServices = 'services/';
  pathToNewService = 'new';

  constructor(private http: HttpClient) { }

  postService(service: Service): Observable<{ message: string, data: string }> {
    const path = `${environment.baseUrl}${this.pathToServices}${this.pathToNewService}`;
    return this.http.post<{ message: string, data: string }>(path, service);
  }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(`${environment.baseUrl}${this.pathToServices}`);
  }
}
