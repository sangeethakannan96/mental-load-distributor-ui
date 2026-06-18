import { Component, OnInit }
from '@angular/core';

import { FamilyService }
from '../../services/family.service';

import { Router }
from '@angular/router';
import { UserService } from 'src/app/services/user.service';

import { MatDialog } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';

import { ConfirmDialogComponent }
from 'src/app/shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-family-members',
  templateUrl:
    './family-members.component.html'
})
export class FamilyMembersComponent
implements OnInit {

  users: any[] = [];

  memberName = '';

  memberEmail = '';

  memberRole = 'Other';

  memberSkills = '';

  editingUser: any = null;

  memberAvailabilityScore = 100;

  errorMessage = '';

  constructor(
  private familyService: FamilyService,
  private userService: UserService,
  private router: Router,
  private dialog: MatDialog,
  private snackBar: MatSnackBar
) {}

  ngOnInit(): void {

  this.loadUsers();
}

loadUsers() {

  this.familyService
    .getMyFamilyUsers()
    .subscribe((response: any) => {

      console.log(response);

      this.users = response;
    });
}

  addMember() {

    this.errorMessage = '';

if (!this.memberName?.trim()) {

  this.errorMessage =
    'Name is required';

  return;
}

if (!this.memberEmail?.trim()) {

  this.errorMessage =
    'Email is required';

  return;
}

if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(this.memberEmail)
) {

  this.errorMessage =
    'Invalid email address';

  return;
}

if (
  this.memberAvailabilityScore < 0 ||
  this.memberAvailabilityScore > 100
) {

  this.errorMessage =
    'Availability must be between 0 and 100';

  return;
}

  const request = {

    name: this.memberName,

    email: this.memberEmail,

    availabilityScore: this.memberAvailabilityScore,

    role:
      this.memberRole,

    skills:
      this.memberSkills
      .split(',')
      .map(s => s.trim())
      .filter(s => s)
  };

  this.familyService
    .addMember(request)
    .subscribe({
  next: response => {

    this.snackBar.open(
      'Member added successfully',
      'Close',
      {
        duration: 3000
      }
    );

    this.loadUsers();

    this.memberName = '';
    this.memberEmail = '';
    this.memberAvailabilityScore = 100;
    this.memberRole = 'Other';
    this.memberSkills = '';
  },

  error: () => {

    this.errorMessage =
      'Unable to add member';
  }
});
}

viewTasks(userId: string) {

  this.router.navigate(
    ['/member-tasks', userId]
  );
}

editMember(user: any) {

  this.editingUser = {

    id: user.id,

    name: user.name,

    availabilityScore:
      user.availabilityScore,

    email: user.email,
    
    role: user.role,

    skills: user.skills.join(', ')
  };
}

saveMember() {

  this.errorMessage = '';

if (!this.editingUser.name?.trim()) {

  this.errorMessage =
    'Name is required';

  return;
}

if (!this.editingUser.email?.trim()) {

  this.errorMessage =
    'Email is required';

  return;
}

if (
  !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    .test(this.editingUser.email)
) {

  this.errorMessage =
    'Invalid email address';

  return;
}

if (
  this.editingUser.availabilityScore < 0 ||
  this.editingUser.availabilityScore > 100
) {

  this.errorMessage =
    'Availability must be between 0 and 100';

  return;
}

  const payload = {

    ...this.editingUser,

    skills: this.editingUser.skills
      .split(',')
      .map((s: string) => s.trim())
      .filter((s: string) => s)
  };

  this.userService
    .updateUser(
      this.editingUser.id,
      payload
    )
    .subscribe({
  next: () => {

     this.snackBar.open(
      'Member updated successfully',
      'Close',
      {
        duration: 3000
      }
    );

    this.loadUsers();

    this.editingUser = null;
  },

  error: () => {

    this.errorMessage =
      'Unable to update member';
  }
});
}

deleteMember(id: string) {

  const dialogRef =
    this.dialog.open(
      ConfirmDialogComponent,
      {
        width: '350px',
        data: {
          title: 'Delete Member',
          message:
            'Are you sure you want to delete this member?'
        }
      }
    );

  dialogRef
    .afterClosed()
    .subscribe(result => {

      if (!result) {
        return;
      }

      this.userService
        .deleteUser(id)
        .subscribe({

          next: () => {

            this.snackBar.open(
              'Member deleted successfully',
              'Close',
              {
                duration: 3000
              }
            );

            this.loadUsers();
          },

          error: () => {

            this.snackBar.open(
              'Unable to delete member',
              'Close',
              {
                duration: 3000
              }
            );
          }
        });
    });
}
}