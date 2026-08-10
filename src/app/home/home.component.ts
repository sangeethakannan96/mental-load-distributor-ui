import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';
import { ReviewMode } from '../models/review-mode';
import { FamilyService } from '../services/family.service';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ReviewMode = ReviewMode;

  activeTasks: any[] = [];

  yesterdayReviewTasks: any[] = [];

  familyMembers: any[] = [];

  constructor(
     private familyService: FamilyService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    

  this.loadYesterdayReview();

  this.loadActiveTasks();

  this.loadFamilyMembers();

  
  }

 loadActiveTasks(): void {
  this.taskService
    .getMyActiveTasks()
    .subscribe(tasks => {
      this.activeTasks = tasks;
    });
}

  loadYesterdayReview(): void {

  this.taskService
    .getMyYesterdayReview()
    .subscribe(tasks => {

      this.yesterdayReviewTasks = tasks;

    });
}

  completeTask(taskId: string): void {
    this.taskService.completeTask(taskId).subscribe(() => {
      this.refreshHome();
    });
  }

  refreshHome(): void {
  this.loadYesterdayReview();
  this.loadActiveTasks();
}


loadFamilyMembers(): void {
  this.familyService.getMyFamilyUsers().subscribe({
    next: members => {
      this.familyMembers = members;
    },
    error: err => {
      console.error('Failed to load family members', err);
    }
  });
}


  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
