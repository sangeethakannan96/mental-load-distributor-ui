import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyProfileService } from 'src/app/services/family-profile.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-review-suggestions',
  templateUrl: './review-suggestions.component.html',
  styleUrls: ['./review-suggestions.component.css']
})
export class ReviewSuggestionsComponent implements OnInit {


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
    this.suggestions
      .filter(s => s.selected)
      .map(s => ({

        ...s,

        startDate: this.formatDate(s.startDate)

      }));

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

private formatDate(date: any): string | null {

  if (!date) {
    return null;
  }

  // Already a yyyy-MM-dd string
  if (typeof date === 'string') {
    return date.substring(0, 10);
  }

  // Convert Date object
  const year = date.getFullYear();

  const month =
    String(date.getMonth() + 1).padStart(2, '0');

  const day =
    String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

}
