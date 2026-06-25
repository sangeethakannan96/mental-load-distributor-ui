import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyProfileService } from 'src/app/services/family-profile.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-household-review',
  templateUrl: './household-review.component.html',
  styleUrls: ['./household-review.component.css']
})
export class HouseholdReviewComponent implements OnInit {


  suggestions: any[] = [];
selectedSuggestions: any[] = [];

constructor(
  private familyProfileService: FamilyProfileService,
  private notificationService: NotificationService,
  private router: Router
) {}


  ngOnInit() {

  const stored =
    sessionStorage.getItem(
      'suggestions'
    );

  if (stored) {

    this.suggestions =
      JSON.parse(stored)
        .map((s: any) => ({
          ...s,
          selected: true
        }));
  }
}

createTasks() {

  const selected =
    this.suggestions.filter(
      s => s.selected
    );

  if (selected.length === 0) {

    this.notificationService.error(
      'Please select at least one task'
    );

    return;
  }

  this.familyProfileService
    .approveSuggestions(selected)
    .subscribe(() => {

      this.notificationService.success(
        'Tasks created successfully'
      );

      sessionStorage.removeItem(
        'suggestions'
      );

      this.router.navigate([
        '/tasks'
      ]);
    });
}

}
