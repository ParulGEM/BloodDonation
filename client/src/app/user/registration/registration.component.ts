import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { Router } from '@angular/router';
BloodDonationService;
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css'],
})
export class RegistrationComponent {
  bloodDonationServiceData: any;
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private router: Router
  ) {
    this.bloodDonationServiceData = bloodDonationService;
  }
  registerForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[a-zA-Z ]+$'),
      Validators.maxLength(30),
      Validators.minLength(2),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),

    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[6-9]\\d{9}$'),
    ]),
    password: new FormControl(null, Validators.required),
    city: new FormControl(null, Validators.required),
    state: new FormControl(null, Validators.required),
    country: new FormControl(null, Validators.required),
  });
  onlyAlphabet(event: any) {
    if (
      (event.charCode >= 65 && event.charCode <= 90) || // Capital letters (A-Z)
      (event.charCode >= 97 && event.charCode <= 122)
    ) {
      // Small letters (a-z)
      return true;
    }
    return false;
  }
  onlyNumber(event: any) {
    if (event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) {
      return false;
    }
    return true;
  }
  get name() {
    return this.registerForm.get('name');
  }
  get email() {
    return this.registerForm.get('email');
  }
  get phone() {
    return this.registerForm.get('phone');
  }
  get password() {
    return this.registerForm.get('password');
  }
  get city() {
    return this.registerForm.get('city');
  }
  get country() {
    return this.registerForm.get('country');
  }
  get state() {
    return this.registerForm.get('state');
  }
  onSubmit(event: Event) {
    event.preventDefault();
    const headers = new HttpHeaders();

    if (this.registerForm.valid) {
      this.http
        .post('http://localhost:5000/user/create', this.registerForm.value, {
          headers,
        })
        .subscribe(
          (response: any) => {
            console.log('RESPONSE ==>', response);

            if (response.status) {
              console.log(response);
              // this.bloodDonationServiceData.saveUserData(response.data);
              this.bloodDonationServiceData.showAlert(
                'success',
                `success :${response.msg}`
              );
              this.router.navigate(['/user/login']);
              // if (this.bloodDonationServiceData.userData.userType === 'ADMIN') {
              //   this.router.navigate(['/dashboard/']);
              // } else {
              //   this.router.navigate(['/']);
              // }
            } else {
              console.log('...>>>', response);
              this.bloodDonationServiceData.showAlert(
                'error',
                `error :${response.msg}`
              );
            }
          },
          (error: any) => {
            console.log('===>', error);
            this.bloodDonationServiceData.showAlert(
              'error',
              `${error.error.msg}`
            );
          }
        );
    } else {
      this.bloodDonationServiceData.showAlert('Error', 'Invalid form');
    }
  }
}
