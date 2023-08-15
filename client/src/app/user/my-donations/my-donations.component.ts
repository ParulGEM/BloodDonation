import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';

@Component({
  selector: 'app-my-donations',
  templateUrl: './my-donations.component.html',
  styleUrls: ['./my-donations.component.css'],
})
export class MyDonationsComponent implements OnInit {
  myDonationData: any = [];
  bloodDonationServiceData: any;
  HttpCalls: any;
  constructor(
    private bloodDonation: BloodDonationService,

    private router: Router,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.HttpCalls = httpCallsService;
  }
  ngOnInit(): void {
    if (this.bloodDonationServiceData.userData.userId) {
      this.HttpCalls.getApi('donation/my-donation', {
        userId: this.bloodDonationServiceData.userData.userId,
      }).subscribe(
        (response: any) => {
          if (response.status) {
            this.myDonationData = response.data;
            this.bloodDonationServiceData.showAlert('Success', response.msg);

            console.log('====>>> BloodDonation ', this.myDonationData);
          } else {
            this.bloodDonationServiceData.showAlert('Error', response.msg);
          }
        },
        (error: any) => {
          this.bloodDonationServiceData.showAlert(
            'error',
            'internal server Error'
          );
        }
      );
    }
  }
  onClickEdit(donor: any) {
    this.bloodDonationServiceData.donationEdit = donor;
    this.router.navigate(['edit/donation', donor._id]);
  }
}
