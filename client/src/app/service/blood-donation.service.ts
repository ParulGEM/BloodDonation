import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class BloodDonationService {
  constructor(
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private router: Router
  ) {}

  jwtToken: String = '';
  isLogin: boolean = false;
  
  loginBydeafault = async () => {
    const userEmail = localStorage.getItem('userEmail');
    const userPassword = localStorage.getItem('userPassword');

    if (userEmail && userPassword) {
      const headers = new HttpHeaders();
      const response: any = await this.http
        .post(
          'http://localhost:5000/user/login',
          { email: userEmail, password: userPassword },
          {
            headers,
          }
        )
        .toPromise();
      if (response) {
        if (response.status) {
          this.saveUserData(response.data);

          this.jwtToken = response.jwtToken;
          this.isLogin = true;

          console.log('----> userData', this.userData);

          this.showAlert('Success', `Success :${response.msg}`);
          if (this.userData.userType === 'ADMIN') {
            this.router.navigate(['/dashboard/']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          this.showAlert('error', `error :${response.msg}`);
        }
      } else {
        this.showAlert('error', `error :Internal Server Error`);
      }
    }
  };

  userData: any = {};
  refreshUserData() {
    this.userData = {};
  }
  saveUserData(data: any) {
    this.userData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      userId: data._id,
      city: data.city,
      country: data.country,
      state: data.state,
      notification: data.notification,
      userType: data.userType,
      verified: data.verified,
    };
  }
  donationArray: [] = [];

  showAlert(type: string, msg: string) {
    console.log('msg', msg);
    this.show(`📩 📩 ${msg}`);
    return;
  }
  show(message: string, duration: number = 5000): void {
    this.snackBar.open(message, '', {
      duration: duration,
    });
  }
}
