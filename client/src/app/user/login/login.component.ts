import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  bloodDonationServiceData: any;
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private router: Router
  ) {
    this.bloodDonationServiceData = bloodDonationService;
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
      const headers = new HttpHeaders();
      //sent data to server through api
      this.http
        .post('http://localhost:5000/user/login', this.loginForm.value, {

          headers,
        })
        .subscribe(
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

                this.bloodDonationServiceData.jwtToken = response.jwtToken;//saved jwt token

                console.log(
                  '----> userData',
                  this.bloodDonationServiceData.userData
                );

                this.bloodDonationServiceData.showAlert(
                  'success',
                  `success :${response.msg}`
                );
                if (
                  this.bloodDonationServiceData.userData.userType === 'ADMIN'
                ) {
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
          (error) => {
            this.bloodDonationServiceData.showAlert('error', error.error?.msg);
          }
        );
    }
  }
}
