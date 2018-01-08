import { AuthService } from './../shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

export interface User {
  email: string;
  password: string;
}

@Component({
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  user: User = {
    email: '',
    password: ''
  };

  constructor(private router: Router, private authService: AuthService) { }

  authenticate() {
    this.authService.authenticate(this.user)
      .subscribe(() => this.router.navigate(['']));
  }
}
