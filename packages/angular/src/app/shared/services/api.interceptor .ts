import { AuthService } from './auth.service';
import { Observable } from 'rxjs/Observable';
import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  authService: AuthService;

  constructor(
    private injector: Injector
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.authService = this.injector.get(AuthService);
    const token = this.authService.getJWT();
    if (token) {
      return next.handle(req.clone({setHeaders: {Authorization: `Bearer ${token}`}}));
    }
    return next.handle(req);
  }
}
