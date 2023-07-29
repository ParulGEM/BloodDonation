import { Component } from '@angular/core';
import { BloodDonationService } from '../service/blood-donation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  bloodDonationdata: any;
  constructor(
    private BloodDonation: BloodDonationService,
    private router: Router
  ) {
    this.bloodDonationdata = BloodDonation;
  }
  logout() {

    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');

    this.bloodDonationdata.isLogin = false;
    this.bloodDonationdata.refreshUserData();
    this.router.navigateByUrl('/');
  }
}
