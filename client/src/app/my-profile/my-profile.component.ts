import { Component } from '@angular/core';
import { BloodDonationService } from '../service/blood-donation.service';
BloodDonationService;
@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  bloodDonationServiceData: any;
  userData: any = {};
  constructor(private bloodDonation: BloodDonationService) {
    this.bloodDonationServiceData = bloodDonation;
    this.userData = this.bloodDonationServiceData.userData;
  }
}
