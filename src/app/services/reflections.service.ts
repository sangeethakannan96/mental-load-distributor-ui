import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReflectionsService {

  private apiUrl =
    'https://localhost:44334/api/reflection';

  constructor(
      private http: HttpClient
    ) { }
  

  getTodayReflection() {

  return this.http.get<any>(
    `${this.apiUrl}/today`
  );

}
}
