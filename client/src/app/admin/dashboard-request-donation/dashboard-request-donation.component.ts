import { Component } from '@angular/core';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';

@Component({
  selector: 'app-dashboard-request-donation',
  templateUrl: './dashboard-request-donation.component.html',
  styleUrls: ['./dashboard-request-donation.component.scss'],
})
export class DashboardRequestDonationComponent {
  bloodDonationServiceData: any;
  HttpCalls: any;
  dashboardData: any;
  constructor(
    private bloodDonation: BloodDonationService,
    private dashboard: DashboardService,

    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.dashboardData = dashboard;
    this.HttpCalls = httpCallsService;
    this.getDetails();
  }
  getDetails() {
    this.HttpCalls.getApi('donation/filter', { requested: true }).subscribe(
      (response: any) => {
        console.log(response);
        if (response.status) {
          this.dashboard.requestedDonationData = response.data;
        } else {
          this.bloodDonationServiceData.showAlert('error', response.msg);
        }
      },
      (error: any) => {
        this.bloodDonationServiceData.showAlert('error', 'Internal server');
      }
    );
  }
  onRejectApprove(status: boolean, donationId: string) {
    this.HttpCalls.postApi('dashboard/approve/donation-request', {
      status,
      donationId,
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
      }
    );
    this.getDetails();
  }
}
