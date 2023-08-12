import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css'],
})
export class MyProfileComponent {
  bloodDonationServiceData: any;
  userData: any = {};
  constructor(
    private bloodDonation: BloodDonationService,
    private router: Router
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.userData = this.bloodDonationServiceData.userData;
  }
  onClickEdit() {
    this.bloodDonationServiceData.editUser = this.userData;

    console.log(
      'this.bloodDonationServiceData.editUser',
      this.bloodDonationServiceData.editUser
    );
    this.router.navigate(['/useredit', this.userData.userId]);
  }
}
