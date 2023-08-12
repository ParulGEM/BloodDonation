import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  HttpCalls: any;
  bloodDonationServiceData: any;
  constructor(
    private bloodDonationService: BloodDonationService,
    private router: Router,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonationService;
    this.HttpCalls = httpCallsService;
  }
  loginForm = new FormGroup({
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),

    password: new FormControl(null, Validators.required),
  });
  get password() {
    return this.loginForm.get('password');
  }
  get email() {
    return this.loginForm.get('email');
  }
  onSubmit(event: Event) {
    event.preventDefault();

    if (this.loginForm.valid) {
      const body = this.loginForm.value;
      this.HttpCalls.postApi('user/login', body).subscribe(
        (response: any) => {
          if (response) {
            if (response.status) {
              this.bloodDonationServiceData.saveUserData(response.data);
              this.bloodDonationServiceData.isLogin = true;

              //setting in local storage
              localStorage.setItem('userEmail', this.email?.value || 'NA');
              localStorage.setItem(
                'userPassword',
                this.password?.value || 'NA'
              );

              this.bloodDonationServiceData.jwtToken = response.jwtToken; //saved jwt token

              console.log(
                '----> userData',
                this.bloodDonationServiceData.userData
              );

              this.bloodDonationServiceData.showAlert(
                'success',
                `success :${response.msg}`
              );
              if (this.bloodDonationServiceData.userData.userType === 'ADMIN') {
                this.router.navigate(['/dashboard/']);
              } else {
                this.router.navigate(['/search']);
              }
            } else {
              this.bloodDonationServiceData.showAlert(
                'error',
                `error :${response.msg}`
              );
            }
          } else {
            this.bloodDonationServiceData.showAlert(
              'error',
              `error :Internal Server Error`
            );
          }
        },
        (error: any) => {
          this.bloodDonationServiceData.showAlert('error', error.error?.msg);
        }
      );
    }
  }
}
