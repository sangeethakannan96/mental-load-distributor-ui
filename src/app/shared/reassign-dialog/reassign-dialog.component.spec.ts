import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReassignDialogComponent } from './reassign-dialog.component';

describe('ReassignDialogComponent', () => {
  let component: ReassignDialogComponent;
  let fixture: ComponentFixture<ReassignDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReassignDialogComponent]
    });
    fixture = TestBed.createComponent(ReassignDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
