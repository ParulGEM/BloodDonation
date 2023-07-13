import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  bloodDonationServiceData: any;
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService
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
  async onSubmit(event: Event) {
    if (this.loginForm.valid) {
      const headers = new HttpHeaders();
      const response: any = await this.http
        .post('http://localhost:5000/user/login', this.loginForm.value, {
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
  }
}
