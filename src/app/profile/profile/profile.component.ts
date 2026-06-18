import { Component, OnInit }
from '@angular/core';

import { UserService }
from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl:
    './profile.component.html'
})
export class ProfileComponent
implements OnInit {

  user: any;

  isEditing = false;

  stats: any;

editUser: any = {};

errorMessage = '';

successMessage = '';

  constructor(
    private userService:
      UserService
  ) {}

  ngOnInit() {

    this.loadProfile();
     this.loadStats();
  }

  loadProfile() {

    this.userService
      .getCurrentUser()
      .subscribe(user => {

        this.user = user;
      });
  }

  loadStats() {

  this.userService
    .getMyStats()
    .subscribe(stats => {

      this.stats = stats;
    });
}

  getRoleName(
  role: number
): string {

  switch (role) {

    case 0:
      return 'Mom';

    case 1:
      return 'Dad';

    default:
      return 'Other';
  }
}

startEdit() {

  this.editUser = {

    ...this.user,

    role:
      this.getRoleName(
        this.user.role
      ),

    skills:
      this.user.skills.join(', ')
  };

  this.isEditing = true;
}

saveProfile() {

  this.errorMessage = '';

  if (!this.editUser.name?.trim()) {

    this.errorMessage =
      'Name is required';

    return;
  }

  if (!this.editUser.email?.trim()) {

    this.errorMessage =
      'Email is required';

    return;
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(this.editUser.email)
  ) {

    this.errorMessage =
      'Invalid email address';

    return;
  }

  if (
    this.editUser.availabilityScore < 0 ||
    this.editUser.availabilityScore > 100
  ) {

    this.errorMessage =
      'Availability must be between 0 and 100';

    return;
  }

  const payload = {

    ...this.editUser,

    skills:
      (this.editUser.skills || '')
        .split(',')
        .map((s: string) =>
          s.trim())
        .filter((s: string) => s)
  };

  this.userService
    .updateUser(
      this.user.id,
      payload
    )
    .subscribe({

      next: () => {

        this.loadProfile();

        this.isEditing = false;

        // Either SnackBar...
        // this.snackBar.open(...)

        // Or NotificationService...
        // this.notificationService.success(...)

      },

      error: () => {

        this.errorMessage =
          'Unable to update profile';
      }
    });
}
}