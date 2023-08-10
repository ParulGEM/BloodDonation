import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { BloodDonationService } from '../service/blood-donation.service';

@Injectable({
  providedIn: 'root',
})
export class UserAuthGuard implements CanActivate {
  BloodDonation: any;
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
    if (this.BloodDonation.isLogin) {
      return true;
    } else {
      this.router.navigate(['/user/login']);
      this.BloodDonation.showAlert('error', 'Login Required');
      return false;
    }
  }
}
