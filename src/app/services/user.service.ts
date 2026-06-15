import { HttpClient }
from '@angular/common/http';

import { Injectable }
from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl =
    'https://localhost:44334/api/users';

  constructor(
    private http: HttpClient
  ) {}

  updateUser(
    id: string,
    user: any
  ) {

    return this.http.put(
      `${this.apiUrl}/${id}`,
      user
    );
  }

  deleteUser(id: string) {

  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}

getCurrentUser() {

  return this.http.get(
    `${this.apiUrl}/me`
  );
}
}