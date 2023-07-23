import { Component, OnInit } from '@angular/core';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { DashboardDonationService } from '../service/dashboard-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-dashboard-donationlist',
  templateUrl: './dashboard-donationlist.component.html',
  styleUrls: ['./dashboard-donationlist.component.css'],
})
export class DashboardDonationlistComponent implements OnInit {
  bloodDonationServiceData: any;
  dashboardData: any;
  displayedColumns: string[] = [
    'country',
    'city',
    'state',
    'bloodGroup',
    'healthIssue',
    'lastDonationTime',
    'description',
    'medicineConsumption',
    'createdBy',
    'actions',
  ];
  constructor(
    private bloodDonation: BloodDonationService,
    private dashboard: DashboardDonationService,
    private http: HttpClient
  ) {
    this.bloodDonationServiceData = bloodDonation;
    this.dashboardData = dashboard;
  }
  ngOnInit(): void {
    this.getdonationData();
  }
  getdonationData() {
    const headers = new HttpHeaders();
    this.http
      .get('http://localhost:5000/donation/filter', {
        headers,
        params: { verified: false },
      })
      .subscribe(
        (response: any) => {
          if (response && response.status) {
            this.dashboardData.donationList = response.data;
          } else {
            this.bloodDonationServiceData.showAlert('error', response.msg);
          }
        },
        (error) => {
          this.bloodDonationServiceData.showAlert(
            'error',
            'Internal server error'
          );
        }
      );
  }
  onRejectApprove(verified: boolean, donationId: string) {
    const headers = new HttpHeaders();

    this.http
      .post(
        'http://localhost:5000/dashboard/approve/donation',
        { verified, donationId },
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
    this.getdonationData();
  }
}
