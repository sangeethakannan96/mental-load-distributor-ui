import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AiService } from '../../services/ai.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-ai-assistant',
  templateUrl: './ai-assistant.component.html',
  styleUrls: ['./ai-assistant.component.css']
})
export class AiAssistantComponent {

  prompt = '';

   dailyPrompt = '';

  constructor(
    private aiService: AiService,
    private notificationService: NotificationService,
    private router: Router
  ) { }


 

generateDailyPlan() {

    this.notificationService.success(
        'Daily Planning coming soon.'
    );

}

  generateEventPlan() {

    if (!this.prompt.trim()) {

      this.notificationService.error(
        'Please enter a description.'
      );

      return;
    }

    this.aiService
      .generateEventPlan(this.prompt)
      .subscribe({

        next: (suggestions) => {

          sessionStorage.setItem(
            'suggestions',
            JSON.stringify(suggestions)
          );

          this.router.navigate([
            '/review-suggestions'
          ]);

        },

         error: () => {

          this.notificationService.error(
            'Failed to generate suggestions.'
          );

        }

      });

    }


}
