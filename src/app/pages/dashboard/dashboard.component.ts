import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DashboardService } from '../../services/dashboard.service';
import { AuthService } from '../../services/auth.service';
import { ChartConfiguration,ChartType} from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public barChartType: 'bar' = 'bar';

barChartData: ChartConfiguration<'bar'>['data'] = {
  labels: [],
  datasets: [
    {
      data: [],
      label: 'Workload (mins)'
    }
  ]
};

barChartOptions:
ChartConfiguration<'bar'>['options'] = {
  responsive: true
};
  dashboard: any;

  constructor(
    private dashboardService: DashboardService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {  

  this.dashboardService
  .getDashboard()
  .subscribe((response: any) => {

    console.log(response);

    this.dashboard = response;

    this.barChartData = {

      labels:
        response.loadPerUser.map(
          (u: any) => u.userName
        ),

      datasets: [
        {
          data:
            response.loadPerUser.map(
              (u: any) => u.totalMinutes
            ),

          label:
            'Workload (mins)'
        }
      ]
    };
});
}


get dashboardCols(): number {

  return window.innerWidth < 768
    ? 1
    : 2;
}

get dashboardStatsCols(): number {

  return window.innerWidth < 768
    ? 1
    : 3;
}

logout() {

  this.authService.logout();

  this.router.navigate(['/login']);
}

}