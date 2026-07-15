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

   weeklyPrompt = '';

   monthlyPrompt = '';

  constructor(
    private aiService: AiService,
    private notificationService: NotificationService,
    private router: Router
  ) { }


 

generateDailyPlan() {

  if (!this.dailyPrompt.trim()) {

    this.notificationService.error(
      'Please tell us what is happening today.'
    );

    return;
  }

  this.aiService
    .generateDailyPlan(this.dailyPrompt)
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
          'Failed to generate daily plan.'
        );

      }

    });

}



generateWeeklyPlan() {

  if (!this.weeklyPrompt.trim()) {

    this.notificationService.error(
      'Please tell us what is happening this week.'
    );

    return;
  }

  this.aiService
    .generateWeeklyPlan(this.weeklyPrompt)
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
          'Failed to generate weekly plan.'
        );

      }

    });

}



generateMonthlyPlan() {

  if (!this.monthlyPrompt.trim()) {

    this.notificationService.error(
      'Please tell us what is happening this month.'
    );

    return;
  }

  this.aiService
    .generateMonthlyPlan(this.monthlyPrompt)
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
          'Failed to generate monthly plan.'
        );

      }

    });

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
