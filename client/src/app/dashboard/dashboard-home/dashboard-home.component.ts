import { Component, OnInit } from '@angular/core';
import { DashboardDonationService } from '../service/dashboard-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.css'],
})
export class DashboardHomeComponent implements OnInit {
  dashboardData: any;
  bloodDonationServiceData: any;
  constructor(
    private dashboardDataservice: DashboardDonationService,
    private http: HttpClient,
    private bloodDonation: BloodDonationService
  ) {
    this.dashboardData = dashboardDataservice;
    this.bloodDonationServiceData = bloodDonation;
  }
  ngOnInit(): void {
    this.http.get('http://localhost:5000/dashboard/user').subscribe(
      (response: any) => {
        if (response) {
          if (response.status) {
            this.dashboardData.userList = response.data;
            this.bloodDonationServiceData.showAlert('success', response.msg);
          } else {
            this.bloodDonationServiceData.showAlert('error', response.msg);
          }
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
