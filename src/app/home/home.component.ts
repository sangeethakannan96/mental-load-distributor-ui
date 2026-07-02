import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../services/dashboard.service';
import { AuthService } from '../services/auth.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  activeTasks: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private taskService: TaskService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadActiveTasks();
  }

  loadActiveTasks(): void {
    this.dashboardService.getDashboard().subscribe((response: any) => {
      this.activeTasks = response?.myActiveTasks || [];
    });
  }

  completeTask(taskId: string): void {
    this.taskService.completeTask(taskId).subscribe(() => {
      this.loadActiveTasks();
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
