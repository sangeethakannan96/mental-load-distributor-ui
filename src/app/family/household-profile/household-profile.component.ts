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

    this.errorMessage = '';

    if (
      !this.householdDescription
        ?.trim()
    ) {

      this.errorMessage =
        'Household context is required';

      return;
    }

    this.familyProfileService
      .update({
        householdDescription:
          this.householdDescription
      })
      .subscribe(() => {

        this.saveHouseholdPlan();

      });
  }

  saveHouseholdPlan() {

    if (!this.planDescription?.trim()) {

      alert(
        'Household context updated'
      );

      return;
    }

    this.householdPlanService
      .get()
      .subscribe({

        next: () => {

          this.householdPlanService
            .update(
              this.planDescription
            )
            .subscribe(() => {

              alert(
                'Household information updated'
              );

            });

        },

        error: () => {

          this.householdPlanService
            .create(
              this.planDescription
            )
            .subscribe(() => {

              alert(
                'Household information saved'
              );

            });

        }

      });
  }

  generateHouseholdPlan() {

    // We'll change this next so that
    // both context and plan are sent
    // to the AI.

    this.AiService
      .generatehouseholdPlan()
      .subscribe((response: any) => {

        sessionStorage.setItem(
          'suggestions',
          JSON.stringify(response)
        );

        this.router.navigate([
          '/review-suggestions'
        ]);

      });
  }
}