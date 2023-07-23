import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from '../service/blood-donation.service';

@Component({
  selector: 'app-my-component',
  templateUrl: './my-component.component.html',
  styleUrls: ['./my-component.component.css'],
})
export class MyComponentComponent implements OnInit {
  // displayedColumns: string[] = [
  //   'Country',
  //   'City',
  //   'State',
  //   'Blood Group',
  //   'Gender',
  //   'Health Issue',
  //   'Last Donation Time',
  //   'Description of Health Condition',
  //   'Medicine Consumption',
  //   'Verified',
  //   'Created By',
  //   'Requested',
  //   'Approved',
  //   'Recipient: Name',
  //   'Recipient: Email',
  // ];

  myDonationData: any = [];
  bloodDonationServiceData: any;
  constructor(
    private bloodDonation: BloodDonationService,
    private http: HttpClient
  ) {
    this.bloodDonationServiceData = bloodDonation;
  }
  ngOnInit(): void {
    if (this.bloodDonationServiceData.userData.userId) {
      this.http
        .get('http://localhost:5000/donation/my-donation', {
          params: {
            userId: this.bloodDonationServiceData.userData.userId,
          },
        })
        .subscribe(
          (response: any) => {
            if (response.status) {
              this.myDonationData = response.data;
              this.bloodDonationServiceData.showAlert('success', response.msg);

              console.log('====>>> BloodDonation ', this.myDonationData);
            } else {
              this.bloodDonationServiceData.showAlert('error', response.msg);
            }
          },
          (error) => {
            this.bloodDonationServiceData.showAlert(
              'error',
              'internal server Error'
            );
          }
        );
    }
  }
}
