import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RegisterRequest } from 'src/app/models/register.model';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {

  name = '';

  email = '';

  password = '';

  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

  this.errorMessage = '';

  if (!this.name?.trim()) {

    this.errorMessage =
      'Name is required';

    return;
  }

  if (!this.email?.trim()) {

    this.errorMessage =
      'Email is required';

    return;
  }

  if (
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
      .test(this.email)
  ) {

    this.errorMessage =
      'Invalid email address';

    return;
  }

  if (!this.password) {

    this.errorMessage =
      'Password is required';

    return;
  }

  if (this.password.length < 6) {

    this.errorMessage =
      'Password must be at least 6 characters';

    return;
  }

  const request: RegisterRequest = {

    name: this.name.trim(),

    email: this.email.trim(),

    password: this.password
  };

  this.authService
    .register(request)
    .subscribe({

      next: (response: any) => {

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(
            response.user
          )
        );

        this.authService
          .getCurrentUser()
          .subscribe((user: any) => {

            if (user.familyId) {

              this.router.navigate([
                '/dashboard'
              ]);

            } else {

              this.router.navigate([
                '/create-family'
              ]);
            }
          });
      },

     error: (err) => {

  this.errorMessage =
    err.error ||
    'Registration failed';
}
    });
}
}