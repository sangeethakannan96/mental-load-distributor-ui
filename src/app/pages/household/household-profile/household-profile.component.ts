import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyProfileService } from 'src/app/services/family-profile.service';

@Component({
  selector: 'app-household-profile',
  templateUrl: './household-profile.component.html',
  styleUrls: ['./household-profile.component.css']
})
export class HouseholdProfileComponent
implements OnInit {

  householdDescription = '';

  suggestions: any[] = [];

  errorMessage = '';

  constructor(
    private familyProfileService:
      FamilyProfileService,
    private router: Router
  ) {}

  ngOnInit() {

    this.loadProfile();
  }

  loadProfile() {

    this.familyProfileService
      .get()
      .subscribe((profile: any) => {

        this.householdDescription =
          profile.householdDescription;
      });
  }

  save() {

    this.errorMessage = '';

    if (
      !this.householdDescription
        ?.trim()
    ) {

      this.errorMessage =
        'Description is required';

      return;
    }

    this.familyProfileService
      .update({
        householdDescription:
          this.householdDescription
      })
      .subscribe(() => {

        alert(
          'Household profile updated'
        );
      });
  }

  generateSuggestions() {

  this.familyProfileService
    .generateTasks()
    .subscribe((response: any) => {

      sessionStorage.setItem(
        'suggestions',
        JSON.stringify(response)
      );

      this.router.navigate([
        '/household-review'
      ]);
    });
}
}
