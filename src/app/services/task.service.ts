import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Recommendation } from '../models/recommendation.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private apiUrl = 'https://localhost:44334/api/tasks';

  constructor(private http: HttpClient) {}

  createTask(task: any) {
    return this.http.post(this.apiUrl, task);
  }

  getTasks() {

  return this.http.get<any[]>(
    this.apiUrl
  );
}

  completeTask(taskId: string) {

  return this.http.put(
    `${this.apiUrl}/${taskId}/complete`,
    {}
  );
}

suggestAssignee(taskId: string) {

  return this.http.post<Recommendation>(
    `${this.apiUrl}/${taskId}/suggest-assignee`,
    {}
  );
}

assignTask(
  taskId: string,
  userId: string
) {

  return this.http.put(
    `${this.apiUrl}/${taskId}/assign/${userId}`,
    {}
  );
}

updateTask(
  id: string,
  task: any
) {

  return this.http.put(
    `${this.apiUrl}/${id}`,
    task
  );
}

deleteTask(id: string) {

  return this.http.delete(
    `${this.apiUrl}/${id}`
  );
}

}
