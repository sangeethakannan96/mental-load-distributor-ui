import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { TaskService } from '../../services/task.service';
import { ChartConfiguration,ChartType} from 'chart.js';
import { DashboardDto, MemberTodayDto } from 'src/app/models/dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboard?: DashboardDto;


  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private taskService: TaskService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.loadDashboard();
}

loadDashboard(): void {
  this.dashboardService
      .getDashboard()
      .subscribe(result => this.dashboard = result);
}

getCompletionPercentage(member: MemberTodayDto): number {

  const total = member.completedTasks + member.pendingTasks;

  if (total === 0) {
    return 0;
  }

  return (member.completedTasks / total) * 100;
}



}