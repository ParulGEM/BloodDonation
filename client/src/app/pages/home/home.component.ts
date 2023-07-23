import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  bloodData: any;
  constructor(
    private router: Router,
    private bloodDoantionData: BloodDonationService
  ) {
    this.bloodData = bloodDoantionData;
  }
  onDonateNow() {
    if (this.bloodData.isLogin) {
      this.router.navigate(['/search']);
    }
    // Navigate to /register page
    else {
      this.router.navigate(['/user/login']);
    }
  }
}
