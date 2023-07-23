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
  async onSubmit(event: Event) {
    event.preventDefault();
    const headers = new HttpHeaders();
    try {
      if (this.registerForm.valid) {
        const response: any = await this.http
          .post('http://localhost:5000/user/create', this.registerForm.value, {
            headers,
          })
          .toPromise();
        if (response) {
          if (response.status) {
            this.bloodDonationServiceData.saveUserData(response.data);
            this.bloodDonationServiceData.showAlert(
              'success',
              `success :${response.msg}`
            );

            if (this.bloodDonationServiceData.userData.userType === 'ADMIN') {
              this.router.navigate(['/dashboard/']);
            } else {
              this.router.navigate(['/']);
            }
            this.router.navigate(['/']);
          } else {
            this.bloodDonationServiceData.showAlert(
              'error',
              `error :${response.msg}`
            );
          }
        } else {
          this.bloodDonationServiceData.showAlert(
            'error',
            `error :internal Server Error`
          );
        }
      }
      
      // else {
      //   if (this.name?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  Name is Invalid'
      //     );
      //     return;
      //   }
      //   if (this.email?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  Email is Invalid'
      //     );
      //     return;
      //   }
      //   if (this.phone?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  Phone is Invalid'
      //     );
      //     return;
      //   }
      //   if (this.password?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  password is Invalid'
      //     );
      //     return;
      //   }
      //   if (this.city?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  city is Invalid'
      //     );
      //     return;
      //   }
      //   if (this.state?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  state is Invalid'
      //     );
      //     return;
      //   }
      //   if (this.country?.invalid) {
      //     this.bloodDonationServiceData.showAlert(
      //       'error',
      //       'ERROR :  country is Invalid'
      //     );
      //     return;
      //   }
      //   this.bloodDonationServiceData.showAlert('Error', 'Invalid form ');
      // }
    } catch (error) {
      this.bloodDonationServiceData.showAlert('Error', error);
    }
  }
}
