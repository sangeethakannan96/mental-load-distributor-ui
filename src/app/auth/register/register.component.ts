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

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {

    const request: RegisterRequest = {

      name: this.name,

      email: this.email,

      password: this.password
    };

    this.authService
      .register(request)
      .subscribe((response: any) => {

        localStorage.setItem(
          'token',
          response.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(response.user)
        );

        this.authService .getCurrentUser() .subscribe((user: any) => {

    if (user.familyId) {

      this.router.navigate(['/dashboard']);

    } else {

      this.router.navigate(['/create-family']);
    }
  });
      });
  }
}