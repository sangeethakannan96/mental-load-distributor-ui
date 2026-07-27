import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DashboardDto } from '../models/dashboard.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://localhost:44334/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard() : Observable<DashboardDto>  {
     return this.http.get<DashboardDto>(this.apiUrl);
  }
}