import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdReviewComponent } from './household-review.component';

describe('HouseholdReviewComponent', () => {
  let component: HouseholdReviewComponent;
  let fixture: ComponentFixture<HouseholdReviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdReviewComponent]
    });
    fixture = TestBed.createComponent(HouseholdReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
