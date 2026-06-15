import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login() {

    this.authService.login(this.email)
      .subscribe((response: any) => {

        localStorage.setItem('token', response.token);

        this.authService .getCurrentUser().subscribe((user: any) => {

    if (user.familyId) {

      this.router.navigate(['/dashboard']);

    } else {

      this.router.navigate(['/create-family']);
    }
  });
      });
  }
}