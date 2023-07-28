import { Component } from '@angular/core';
import { DashboardDonationService } from '../service/dashboard-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
@Component({
  selector: 'app-dashboard-userlist',
  templateUrl: './dashboard-userlist.component.html',
  styleUrls: ['./dashboard-userlist.component.css'],
})
export class DashboardUserlistComponent {
  displayedColumns: string[] = [
    'email',
    'phone',
    'name',
    'city',
    'state',
    'country',
    'actions',
  ];
  dashboardData: any;
  bloodDonationServiceData: any;
  constructor(
    private dashboardDataservice: DashboardDonationService,
    private http: HttpClient,
    private bloodDonationService: BloodDonationService
  ) {
    this.dashboardData = dashboardDataservice;
    this.bloodDonationServiceData = bloodDonationService;
  }
  updatelist(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken}`
    );
    this.http
      .get('http://localhost:5000/dashboard/user', { headers })
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.dashboardData.userList = response.data;
            this.bloodDonationServiceData.showAlert('success', response.msg);
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
  onRejectApprove(verified: boolean, email: string) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken}`
    );
    const body = { verified, email };
    console.log('===> body', body);
    this.http
      .post('http://localhost:5000/dashboard/approve/user', body, { headers })
      .subscribe(
        (response: any) => {
          if (response) {
            if (response.status) {
              this.bloodDonationServiceData.showAlert('success', response.msg);
            } else {
              this.bloodDonationServiceData.showAlert('error', response.msg);
            }
          }
          this.updatelist();
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
