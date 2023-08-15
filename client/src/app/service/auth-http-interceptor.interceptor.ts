import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BloodDonationService } from './blood-donation.service';

@Injectable()
export class AuthHttpInterceptorInterceptor implements HttpInterceptor {
  bloodDonation: any;
  constructor(private bloodDonationService: BloodDonationService) {
    this.bloodDonation = bloodDonationService;
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const token = this.bloodDonation.jwtToken;
    const isAPIURL = request.url.startsWith(environment.apiURL);

    if (token && isAPIURL) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
