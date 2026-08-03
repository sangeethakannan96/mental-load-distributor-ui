import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ChartConfiguration,ChartType} from 'chart.js';
import { DashboardDto, MemberTodayDto } from 'src/app/models/dashboard.model';
import { ReviewMode }
from 'src/app/models/review-mode';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard?: DashboardDto;

   familyReviewTasks: any[] = [];

   ReviewMode = ReviewMode;


  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.loadDashboard();
   this.loadFamilyReviewTasks();
}

loadDashboard(): void {
  this.dashboardService
      .getDashboard()
      .subscribe(result => this.dashboard = result);
}

loadFamilyReviewTasks(): void {
  this.dashboardService
      .getFamilyReviewTasks()
      .subscribe({
        next: tasks => this.familyReviewTasks = tasks,
        error: err => console.error(err)
      });
}

completeTask(taskId: string): void {

  this.taskService
    .completeTask(taskId)
    .subscribe(() => {

      this.loadDashboard();
      this.loadFamilyReviewTasks();

    });

}

getCompletionPercentage(member: MemberTodayDto): number {

  const total = member.completedTasks + member.pendingTasks;

  if (total === 0) {
    return 0;
  }

  return (member.completedTasks / total) * 100;
}



}