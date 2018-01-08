import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService implements CanActivate {
  JWT_KEY = 'retain_token';

  constructor(
    private router: Router,
    private httpClient: HttpClient,
  ) { }

  signOut(): void {
    localStorage.removeItem(this.JWT_KEY);
    this.router.navigate(['auth']);
  }

  setJWT(jwt: string): void {
    localStorage.setItem(this.JWT_KEY, jwt);
  }

  getJWT() {
    return localStorage.getItem(this.JWT_KEY);
  }

  authenticate(creds: any): Observable<any> {
    return this.httpClient.post(`${environment.apiUrl}/auth`, creds)
      .do((res: {token: string}) => this.setJWT(res.token));
  }

  isAuthorized(): boolean {
    return !!localStorage.getItem(this.JWT_KEY);
  }

  canActivate(): boolean {
    const isAuth = this.isAuthorized();

    if (!isAuth) {
      this.router.navigate(['auth']);
    }

    return isAuth;
  }
}
