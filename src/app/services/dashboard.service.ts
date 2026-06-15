import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private apiUrl = 'https://localhost:44334/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboard() {
     return this.http.get(this.apiUrl);
  }
}