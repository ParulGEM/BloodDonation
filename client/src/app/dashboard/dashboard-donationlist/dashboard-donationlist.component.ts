import { Component, OnInit } from '@angular/core';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { DashboardDonationService } from '../../service/dashboard-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpCallsService } from 'src/app/service/http-calls.service';
@Component({
  selector: 'app-dashboard-donationlist',
  templateUrl: './dashboard-donationlist.component.html',
  styleUrls: ['./dashboard-donationlist.component.css'],
})
export class DashboardDonationlistComponent implements OnInit {
  bloodDonationServiceData: any;
  dashboardData: any;
  HttpCalls: any;

  constructor(
    private bloodDonation: BloodDonationService,
    private dashboard: DashboardDonationService,
    private http: HttpClient,
    private router: Router,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.dashboardData = dashboard;
    this.HttpCalls = httpCallsService;
  }
  ngOnInit(): void {
    this.getdonationData();
  }
  getdonationData() {
    this.HttpCalls.getApi('donation/filter', { verified: false }).subscribe(
      (response: any) => {
        if (response && response.status) {
          this.dashboardData.donationList = response.data;
        } else {
          this.bloodDonationServiceData.showAlert('error', response.msg);
        }
      },
      (error: any) => {
        this.bloodDonationServiceData.showAlert(
          'error',
          'Internal server error'
        );
      }
    );
  }
  onRejectApprove(verified: boolean, donationId: string) {
    this.HttpCalls.postApi('dashboard/approve/donation', {
      verified,
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
    this.getdonationData();
  }
  onEdit(user: any) {
    this.bloodDonationServiceData.donationEdit = user;
    this.router.navigate(['/donationedit', user._id]);
  }
  onDelete(id: string) {
    this.HttpCalls.deleteApi('dashboard/donation', {
      donationId: id,
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
    this.getdonationData();
  }
}
