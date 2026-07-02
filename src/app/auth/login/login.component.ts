import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';

errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.errorMessage = '';

this.authService
  .login(this.email)
  .subscribe({
    next: (response: any) => {

      localStorage.setItem(
        'token',
        response.token
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

      console.error(err);

      this.errorMessage =
        'Login failed. Please check your email.';
    }
  });

  }
}