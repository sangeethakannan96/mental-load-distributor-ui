import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-household-review',
  templateUrl: './household-review.component.html',
  styleUrls: ['./household-review.component.css']
})
export class HouseholdReviewComponent implements OnInit {


  suggestions: any[] = [];
selectedSuggestions: any[] = [];

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

}
