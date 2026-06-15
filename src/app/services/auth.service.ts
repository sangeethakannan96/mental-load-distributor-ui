import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegisterRequest } from '../models/register.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'https://localhost:44334/api/auth';

  constructor(private http: HttpClient) {}

  login(email: string) {
    return this.http.post(`${this.apiUrl}/login`, {
      email: email
    });
  }

  register(data: RegisterRequest) {

  return this.http.post(
    `${this.apiUrl}/register`,
    data
  );
}

  getCurrentUser() {

  return this.http.get(
    'https://localhost:44334/api/users/me'
  );
}

  logout() {

  localStorage.removeItem('token');

  localStorage.removeItem('user');
}

}