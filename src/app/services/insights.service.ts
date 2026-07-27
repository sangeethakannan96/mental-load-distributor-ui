import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { InsightsDto } from '../models/insights.model';

@Injectable({
  providedIn: 'root'
})
export class InsightsService {

  private apiUrl = 'https://localhost:44334/api/insights';

  constructor(private http: HttpClient) { }

  getInsights(period: string) {
    return this.http.get<InsightsDto>(
      `${this.apiUrl}?period=${period}`
    );
  }
}