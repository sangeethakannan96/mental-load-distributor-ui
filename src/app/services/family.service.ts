import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FamilyService {

  private apiUrl =
    'https://localhost:44334/api/families';

  constructor(
    private http: HttpClient
  ) {}

  createFamily(data: any) {

    return this.http.post(
      this.apiUrl,
      data
    );
  }

  getMyFamilyUsers() {

  return this.http.get(
    `${this.apiUrl}/mine/users`
  );
}

    addMember(data: any) {

  return this.http.post(
    `${this.apiUrl}/mine/users`,
    data
  );
}

updateUser(
  id: string,
  user: any
) {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    user
  );
}

}