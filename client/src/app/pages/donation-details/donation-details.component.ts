import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';
@Component({
  selector: 'app-donation-details',
  templateUrl: './donation-details.component.html',
  styleUrls: ['./donation-details.component.css'],
})
export class DonationDetailsComponent implements OnInit {
  bloodDonationServiceData: any;
  donationId: string = '';
  HttpCalls: any;
  donationData: any = {};
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private router: Router,
    private bloodDonation: BloodDonationService,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.HttpCalls = httpCallsService;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.donationId = params.get('id') || '';
    });

    const params = new HttpParams().set('donationId', this.donationId);

    this.HttpCalls.getApi('donation/details', params).subscribe(
      (response: any) => {
        if (response) {
          if (response.status) {
            this.bloodDonationServiceData.showAlert('success', response.msg);
            this.donationData = response.data;

            console.log(this.donationData);
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
      (error: any) => {
        console.error(error);
      }
    );
  }
  addDonation() {
    const recipienter = this.bloodDonationServiceData.userData.userId;

    if (!recipienter) {
      this.bloodDonationServiceData.showAlert('error', 'Login First');
      this.router.navigate(['user/login']);
      return;
    }

    this.HttpCalls.postApi('donation/request', {
      recipienter,
      donationId: this.donationId,
    }).subscribe(
      (response: any) => {
        if (response) {
          if (response.status) {
            this.bloodDonationServiceData.showAlert('success', response.msg);
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
      (error: any) => {
        console.error(error);
        this.bloodDonationServiceData.showAlert('error', error.error?.msg);
      }
    );
  }
}
