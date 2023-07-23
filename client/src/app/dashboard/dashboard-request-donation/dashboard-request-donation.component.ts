import { Component } from '@angular/core';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { DashboardDonationService } from '../service/dashboard-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-request-donation',
  templateUrl: './dashboard-request-donation.component.html',
  styleUrls: ['./dashboard-request-donation.component.css'],
})
export class DashboardRequestDonationComponent {
  bloodDonationServiceData: any;
  dashboardData: any;
  displayedColumns: string[] = [
    'country',
    'state',
    'city',
    'bloodGroup',
    'recipientEmail',
    'recipientName',
    'createdByEmail',
    'createdByName',
    'action',
  ];
  constructor(
    private bloodDonation: BloodDonationService,
    private dashboard: DashboardDonationService,
    private http: HttpClient
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.dashboardData = dashboard;
    this.getDetails();
  }
  getDetails() {
    this.http
      .get('http://localhost:5000/donation/filter', {
        params: { requested: true },
      })
      .subscribe(
        (response: any) => {
          console.log(response);
          if (response.status) {
            this.dashboard.requestedDonationData = response.data;
          } else {
            this.bloodDonationServiceData.showAlert('error', response.msg);
          }
        },
        (error) => {
          this.bloodDonationServiceData.showAlert('error', 'Internal server');
        }
      );
  }
  onRejectApprove(status: boolean, donationId: string) {
    const headers = new HttpHeaders();
    this.http
      .post(
        'http://localhost:5000/dashboard/approve/donation-request',
        { status, donationId },
        { headers }
      )
      .subscribe(
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
        (error) => {
          console.error(error);
        }
      );
    this.getDetails();
  }
}
