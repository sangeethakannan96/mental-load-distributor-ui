
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiService } from 'src/app/services/ai.service';

@Component({
  selector: 'app-approved-plan',
  templateUrl: './approved-plan.component.html',
  styleUrls: ['./approved-plan.component.css']
})
export class ApprovedPlanComponent implements OnInit {

  approvedPlan: any = null;
  dailyItems: any[] = [];
  weeklyItems: any[] = [];
  monthlyItems: any[] = [];
  otherItems: any[] = [];

  isLoading = true;
  errorMessage = '';

  constructor(
    private aiService: AiService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadApprovedPlan();
  }

  loadApprovedPlan(): void {
    this.isLoading = true;
    this.errorMessage = '';

    this.aiService.getApprovedPlan().subscribe({
      next: (response: any) => {
        this.approvedPlan = response;

        const items = response.items ?? [];

        this.dailyItems = items.filter(
          (item: any) => item.recurrence === 'Daily'
        );

        this.weeklyItems = items.filter(
          (item: any) => item.recurrence === 'Weekly'
        );

        this.monthlyItems = items.filter(
          (item: any) => item.recurrence === 'Monthly'
        );

        this.otherItems = items.filter(
          (item: any) =>
            !['Daily', 'Weekly', 'Monthly']
              .includes(item.recurrence)
        );

        this.isLoading = false;
      },
      error: (error: any) => {
        this.isLoading = false;

        this.errorMessage =
          error.status === 404
            ? 'No approved household plan was found.'
            : 'Unable to load the approved plan. Please try again.';
      }
    });
  }

  goToTasks(): void {
    this.router.navigate(['/tasks']);
  }
}
