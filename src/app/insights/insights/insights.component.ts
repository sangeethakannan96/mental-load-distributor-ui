import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  selectedPeriod = 'yesterday';

  dashboard: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {

    this.loadInsights();

  }

  loadInsights() {

    // For now reuse Dashboard API

    this.dashboardService
      .getDashboard()
      .subscribe(result => {

        this.dashboard = result;

      });

  }

  onPeriodChanged() {

    this.loadInsights();

  }

}