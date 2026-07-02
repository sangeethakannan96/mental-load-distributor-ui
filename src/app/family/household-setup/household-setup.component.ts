import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FamilyProfileService } from 'src/app/services/family-profile.service';

@Component({
  selector: 'app-household-setup',
  templateUrl: './household-setup.component.html',
  styleUrls: ['./household-setup.component.css']
})
export class HouseholdSetupComponent {

  householdDescription = '';

  errorMessage = '';

  constructor(
    private familyProfileService:
      FamilyProfileService,

    private router: Router
  ) {}

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
      .create({
        householdDescription:
          this.householdDescription
      })
      .subscribe(() => {

        this.router.navigate(
          ['/dashboard']
        );
      });
  }
}
