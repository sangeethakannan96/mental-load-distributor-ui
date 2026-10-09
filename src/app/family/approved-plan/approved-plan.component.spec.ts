import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedPlanComponent } from './approved-plan.component';

describe('ApprovedPlanComponent', () => {
  let component: ApprovedPlanComponent;
  let fixture: ComponentFixture<ApprovedPlanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ApprovedPlanComponent]
    });
    fixture = TestBed.createComponent(ApprovedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
