import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HouseholdProfileComponent } from './household-profile.component';

describe('HouseholdProfileComponent', () => {
  let component: HouseholdProfileComponent;
  let fixture: ComponentFixture<HouseholdProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HouseholdProfileComponent]
    });
    fixture = TestBed.createComponent(HouseholdProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
