import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AiService {

   private apiUrl =
    'https://localhost:44334/api/ai';

  constructor(
    private http: HttpClient
  ) { }

generatehouseholdSuggestions() {

  return this.http.post(
    `${this.apiUrl}/generate-household-suggestions`,
    {}
  );
}

generateTaskSuggestions(prompt: string) {

  return this.http.post<any[]>(

    `${this.apiUrl}/generate-task-suggestions`,

    {
      prompt: prompt
    }

  );

}

approveSuggestions(suggestions: any[]) {

  return this.http.post(
    `${this.apiUrl}/approve-suggestions`,
    {
      suggestions
    }
  );
}

  
}
