import { Component, OnInit } from '@angular/core';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.css'],
})
export class ViewDonationComponent implements OnInit {
  
  bloodDonationServiceData: any;
  constructor(
    private router: Router,
    private bloodDonation: BloodDonationService,
    private http: HttpClient
  ) {
    this.bloodDonationServiceData = bloodDonation;
    console.log('donationArry-->', this.bloodDonationServiceData.donationArray);
  }
  ngOnInit(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken}`
    );

    this.http
      .get('http://localhost:5000/donation/filter', { headers })
      .subscribe(
        (response: any) => {
          if (response) {
            if (response.status) {
              this.bloodDonationServiceData.donationArray = response.data;
            } else {
              this.bloodDonationServiceData.showAlert('error', response.msg);
            }
          } else {
            this.bloodDonationServiceData.showAlert(
              'error',
              'internal server error'
            );
          }
        },
        (error) => {
          console.log(error);
          this.bloodDonationServiceData.showAlert(
            'error',
            'An error occurred.'
          );
        }
      );
  }
  addDonation(donation: any) {
    this.router.navigate(['details', donation._id]);
  }
}
