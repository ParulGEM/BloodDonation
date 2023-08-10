import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from '../../service/blood-donation.service';
import { Router } from '@angular/router';
import { HttpCallsService } from 'src/app/service/http-calls.service';
@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponentComponent implements OnInit {
  myDonationData: any = [];
  bloodDonationServiceData: any;
  HttpCalls: any;
  constructor(
    private bloodDonation: BloodDonationService,
    private http: HttpClient,
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
    this.router.navigate(['/donationedit', donor._id]);
  }
}
