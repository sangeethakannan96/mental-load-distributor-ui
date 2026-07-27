import { Component, OnInit } from '@angular/core';
import { InsightsService } from 'src/app/services/insights.service';
import { FamilyService } from 'src/app/services/family.service';
import { InsightsDto } from 'src/app/models/insights.model';

@Component({
  selector: 'app-insights',
  templateUrl: './insights.component.html',
  styleUrls: ['./insights.component.css']
})
export class InsightsComponent implements OnInit {

  selectedPeriod = 'yesterday';

  insights?: InsightsDto;

  loading = false;

  constructor(
    private insightsService: InsightsService,
    private familyService: FamilyService
  ) { }

  ngOnInit(): void {

    this.loadInsights();

  }

  loadInsights(): void {

  this.loading = true;

  this.insightsService
      .getInsights(this.selectedPeriod)
      .subscribe({

        next: result => {

          this.insights = result;
          this.loading = false;

        },

        error: err => {

          console.error(err);
          this.loading = false;

        }

      });

}

  onPeriodChanged(): void {

    this.loadInsights();

  }

}