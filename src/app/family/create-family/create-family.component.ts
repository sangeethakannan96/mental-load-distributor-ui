import { Component } from '@angular/core';

import { Router } from '@angular/router';

import { FamilyService }
from '../../services/family.service';

@Component({
  selector: 'app-create-family',
  templateUrl: './create-family.component.html'
})
export class CreateFamilyComponent {

  familyName = '';

  constructor(
    private familyService: FamilyService,
    private router: Router
  ) {}

  createFamily() {

    const request = {

      name: this.familyName
    };

    this.familyService
      .createFamily(request)
      .subscribe(response => {

        console.log(response);

        this.router.navigate(['/dashboard']);
      });
  }
}