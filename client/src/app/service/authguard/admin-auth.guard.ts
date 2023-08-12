import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BloodDonationService } from '../blood-donation.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthGuard implements CanActivate {
  BloodDonation;
  constructor(
    private bloodDonationService: BloodDonationService,
    private router: Router
  ) {
    this.BloodDonation = bloodDonationService;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (this.BloodDonation.userData.userType === 'ADMIN') {
      return true;
    } else {
      this.BloodDonation.showAlert('error', 'unauthorized');
      this.router.navigate(['/']);
      return false;
    }
  }
}
