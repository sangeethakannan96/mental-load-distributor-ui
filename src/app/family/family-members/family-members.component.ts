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
    .subscribe(response => {

      console.log(response);

      this.loadUsers();

      this.memberName = '';

      this.memberEmail = '';

      this.memberAvailabilityScore = 100;
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
    .subscribe(() => {

      this.loadUsers();

      this.editingUser = null;
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