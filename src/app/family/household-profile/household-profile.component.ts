import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AiService } from 'src/app/services/ai.service';
import { FamilyProfileService } from 'src/app/services/family-profile.service';
import { HouseholdPlanService } from 'src/app/services/household-plan.service';

@Component({
  selector: 'app-household-profile',
  templateUrl: './household-profile.component.html',
  styleUrls: ['./household-profile.component.css']
})
export class HouseholdProfileComponent
  implements OnInit {

  householdDescription = '';

  planDescription = '';

  changeInstructions = '';

  errorMessage = '';

  constructor(
    private familyProfileService:
      FamilyProfileService,

    private householdPlanService:
      HouseholdPlanService,

    private AiService:
      AiService,

    private router: Router
  ) {}

  ngOnInit() {

    this.loadProfile();

    this.loadHouseholdPlan();
  }

  loadProfile() {

    this.familyProfileService
      .get()
      .subscribe((profile: any) => {

        this.householdDescription =
          profile.householdDescription;
      });
  }

  loadHouseholdPlan() {

    this.householdPlanService
      .get()
      .subscribe({

        next: (plan: any) => {

          this.planDescription =
            plan.planDescription;
        },

        error: () => {

          // No plan exists yet.
          this.planDescription = '';
        }

      });
  }

  
save() {
  this.saveProfileAndPlan(false);
}

generateHouseholdPlan() {
  this.saveProfileAndPlan(true);
}

private saveProfileAndPlan(generatePlan: boolean) {
  this.errorMessage = '';

  if (!this.householdDescription?.trim()) {
    this.errorMessage = 'Household context is required';
    return;
  }

  this.familyProfileService.update({
    householdDescription: this.householdDescription.trim()
  }).subscribe({
    next: () => {
      this.saveHouseholdPlanAndContinue(generatePlan);
    },
    error: () => {
      this.errorMessage = 'Failed to save household context. Please try again.';
    }
  });
}

private saveHouseholdPlanAndContinue(generatePlan: boolean) {
  const plan = this.planDescription?.trim();

  // If the plan is blank, don't create an empty plan.
  if (!plan) {
    if (generatePlan) {
      this.errorMessage = 'Household plan is required to generate suggestions.';
    } else {
      alert('Household context saved.');
    }
    return;
  }

  this.householdPlanService.get().subscribe({
    next: () => {
      this.updateHouseholdPlan(plan, generatePlan);
    },
    error: () => {
      this.householdPlanService.create(plan).subscribe({
        next: () => this.afterProfileSaved(generatePlan),
        error: () => {
          this.errorMessage = 'Failed to save household plan. Please try again.';
        }
      });
    }
  });
}

private updateHouseholdPlan(plan: string, generatePlan: boolean) {
  this.householdPlanService.update(plan).subscribe({
    next: () => this.afterProfileSaved(generatePlan),
    error: () => {
      this.errorMessage = 'Failed to update household plan. Please try again.';
    }
  });
}

private afterProfileSaved(generatePlan: boolean) {
  if (!generatePlan) {
    alert('Household information saved.');
    return;
  }

  this.AiService.generatehouseholdPlan(this.changeInstructions).subscribe({
    next: (response: any) => {
      sessionStorage.setItem('suggestions', JSON.stringify(response));
      this.router.navigate(['/review-suggestions']);
    },
    error: () => {
      this.errorMessage =
        'Household information was saved, but plan generation failed. Please try again.';
    }
  });
}
  }