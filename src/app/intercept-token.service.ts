import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InterceptTokenService implements HttpInterceptor {
  // Initialization

  constructor(private a: AuthService) {}

  // Methods

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!request.url.includes('spotify.com')) {
      request = request.clone({
        setHeaders: {
          Authorization: `JWT ${this.a.getToken()}`,
        },
      });
    }

    // Pass the request on to the next handler
    return next.handle(request);
  }
}
