import { Component, OnInit } from '@angular/core';
import { DashboardDonationService } from '../service/dashboard-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard-userlist',
  templateUrl: './dashboard-userlist.component.html',
  styleUrls: ['./dashboard-userlist.component.css'],
})
export class DashboardUserlistComponent implements OnInit {
  dashboardData: any;
  bloodDonationServiceData: any;
  constructor(
    private dashboardDataservice: DashboardDonationService,
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private router: Router
  ) {
    this.dashboardData = dashboardDataservice;
    this.bloodDonationServiceData = bloodDonationService;
  }
  ngOnInit(): void {
    this.updatelist();
  }

  updatelist(): void {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken}`
    );

    console.log(`Bearer ${this.bloodDonationServiceData.jwtToken}`);
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
  onClickEdit(user: any) {
    this.bloodDonationServiceData.editUser = user;
    this.router.navigate(['/useredit', user._id]);
  }
  onClickDelete(user: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken}`
    );
    this.http
      .delete('http://localhost:5000/dashboard/user', {
        headers,
        params: { userId: user._id },
      })
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.bloodDonationServiceData.showAlert('success', response.msg);
          } else {
            this.bloodDonationServiceData.showAlert('error', response.msg);
          }
        },
        (error) => {
          this.bloodDonationServiceData.showAlert(
            'error',
            error.error.msg || 'Something went wrong'
          );
        }
      );
    this.updatelist();
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
            'Internal server Error'
          );
        }
      );
  }
}
