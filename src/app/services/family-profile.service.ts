import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class FamilyProfileService {

  private apiUrl =
    'https://localhost:44334/api/familyprofile';

  constructor(
    private http: HttpClient
  ) {}

  get() {

    return this.http.get(
      this.apiUrl
    );
  }

  create(request: any) {

    return this.http.post(
      this.apiUrl,
      request
    );
  }

  update(request: any) {

  return this.http.put(
    this.apiUrl,
    request
  );
}

generateTasks() {

  return this.http.post(
    `${this.apiUrl}/generate-tasks`,
    {}
  );
}

}