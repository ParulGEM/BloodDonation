import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { DashboardService } from 'src/app/service/dashboard.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-dashboard-userlist',
  templateUrl: './dashboard-userlist.component.html',
  styleUrls: ['./dashboard-userlist.component.scss'],
})
export class DashboardUserlistComponent implements OnInit {
  dashboardData: any;
  bloodDonationServiceData: any;
  HttpCalls: any;
  constructor(
    private dashboardDataservice: DashboardService,
    private bloodDonationService: BloodDonationService,
    private router: Router,
    private httpCallsService: HttpCallsService
  ) {
    this.dashboardData = dashboardDataservice;
    this.bloodDonationServiceData = bloodDonationService;
    this.HttpCalls = httpCallsService;
  }
  ngOnInit(): void {
    this.updatelist();
  }

  updatelist(): void {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.bloodDonationServiceData.jwtToken}`
    // );

    // console.log(`Bearer ${this.bloodDonationServiceData.jwtToken}`);
    // this.http
    //   .get('http://localhost:5000/dashboard/user', { headers })

    const params = new HttpParams();
    this.HttpCalls.getApi('dashboard/user', params).subscribe(
      (response: any) => {
        if (response.status) {
          this.dashboardData.userList = response.data;
          this.bloodDonationServiceData.showAlert('success', response.msg);
        } else {
          this.bloodDonationServiceData.showAlert('error', response.msg);
        }
      },
      (error: any) => {
        this.bloodDonationServiceData.showAlert(
          'error',
          'internal server Error'
        );
      }
    );
  }
  onClickEdit(user: any) {
    this.bloodDonationServiceData.editUser = user;
    this.router.navigate(['edit/user', user._id]);
  }
  onClickDelete(user: any) {
    this.HttpCalls.deleteApi('dashboard/user', { userId: user._id }).subscribe(
      (response: any) => {
        if (response.status) {
          this.bloodDonationServiceData.showAlert('success', response.msg);
        } else {
          this.bloodDonationServiceData.showAlert('error', response.msg);
        }
      },
      (error: any) => {
        this.bloodDonationServiceData.showAlert(
          'error',
          error.error.msg || 'Something went wrong'
        );
      }
    );
    this.updatelist();
  }

  onRejectApprove(verified: boolean, email: string) {
    // const headers = new HttpHeaders().set(
    //   'Authorization',
    //   `Bearer ${this.bloodDonationServiceData.jwtToken}`
    // );
    const body = { verified, email };
    // console.log('===> body', body);
    // this.http
    //   .post('http://localhost:5000/dashboard/approve/user', body, { headers })

    this.HttpCalls.postApi('dashboard/approve/user', body).subscribe(
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
      (error: any) => {
        this.bloodDonationServiceData.showAlert(
          'error',
          'Internal server Error'
        );
      }
    );
  }
}
