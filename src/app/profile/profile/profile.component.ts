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

editUser: any = {};

  constructor(
    private userService:
      UserService
  ) {}

  ngOnInit() {

    this.loadProfile();
  }

  loadProfile() {

    this.userService
      .getCurrentUser()
      .subscribe(user => {

        this.user = user;
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

  const payload = {

    ...this.editUser,

    skills:
      this.editUser.skills
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
    .subscribe(() => {

      this.loadProfile();

      this.isEditing = false;
    });
}
}