import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css'],
})
export class UserEditComponent {
  userData: any = {};
  dashboardData: any;
  registerForm: any;
  bloodDonationServiceData: any;
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private router: Router
  ) {
    this.bloodDonationServiceData = bloodDonationService;

    this.userData = this.bloodDonationServiceData.editUser;
    console.log('====>>>>this.userData', this.userData);
    this.registerForm = new FormGroup({
      name: new FormControl(this.userData?.name || '', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]+$'),
        Validators.maxLength(30),
        Validators.minLength(2),
      ]),

      city: new FormControl(this.userData.city || '', Validators.required),
      state: new FormControl(this.userData.state || '', Validators.required),
      country: new FormControl(
        this.userData.country || '',
        Validators.required
      ),
    });
  }
  get name() {
    return this.registerForm.get('name');
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
  onSubmit(userData: any) {
    const body = {
      ...this.registerForm.value,
      userId: this.userData._id || this.userData.userId,
    };

    console.log(
      'this.bloodDonationServiceData.jwtToken==>>',
      this.bloodDonationServiceData.jwtToken
    );
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken}`
    );

    console.log('====>>>>body', body);
    this.http
      .put('http://localhost:5000/dashboard/user', body, { headers })
      .subscribe(
        (response: any) => {
          if (response.status) {
            this.bloodDonationServiceData.showAlert('success', response.msg);

            if (this.bloodDonationServiceData.userData.userType === 'ADMIN') {
              this.router.navigate(['/dashboard/users']);
            } else {
              this.bloodDonationServiceData.userData = response.data;
              this.router.navigate(['profile']);
            }
          } else {
            this.bloodDonationServiceData.showAlert('error', response.msg);
          }
        },
        (err) => {
          this.bloodDonationServiceData.showAlert(
            'error',
            err.error.message || 'Something went wrong'
          );
        }
      );
  }
}
