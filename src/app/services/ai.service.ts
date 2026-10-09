import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SuggestedTask } from '../models/suggested-task';

@Injectable({
  providedIn: 'root'
})
export class AiService {

   private apiUrl =
    'https://localhost:44334/api/ai';

  constructor(
    private http: HttpClient
  ) { }

generatehouseholdPlan(changeInstructions: string) {

  return this.http.post<any>(
    `${this.apiUrl}/generate-household-plan`,
    {
      changeInstructions: changeInstructions?.trim() || null
    }
  );
}

generateEventPlan(prompt: string) {

  return this.http.post<SuggestedTask[]>(

    `${this.apiUrl}/generate-event-plan`,

    {
      prompt: prompt
    }

  );

}


generateDailyPlan(prompt: string) {

  return this.http.post<SuggestedTask[]>(

    `${this.apiUrl}/generate-daily-plan`,

    {
      prompt: prompt
    }

  );

}


generateWeeklyPlan(prompt: string) {

  return this.http.post<SuggestedTask[]>(

    `${this.apiUrl}/generate-weekly-plan`,

    {
      prompt: prompt
    }

  );

}

generateMonthlyPlan(prompt: string) {

  return this.http.post<SuggestedTask[]>(
    `${this.apiUrl}/generate-monthly-plan`,
    {
      prompt: prompt
    }
  );

}

approveSuggestions(suggestions: SuggestedTask[]) {

  return this.http.post(
    `${this.apiUrl}/approve-suggestions`,
    {
      suggestions
    }
  );
}

analyzeReflection(content: string) {

  return this.http.post<any>(
    `${this.apiUrl}/analyze-reflection`,
    {
      content: content
    }
  );

}


getApprovedPlan() {
  return this.http.get<any>(
    `${this.apiUrl}/approved-plan`
  );
}



  
}
