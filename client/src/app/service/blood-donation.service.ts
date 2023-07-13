import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BloodDonationService {
  userData: any;
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

  constructor() {}
  errralert: boolean = false;
  successalert: boolean = false;
  message: string = '';

  showAlert(type: string, msg: string) {
    console.log('trigger');
    if (type === 'error') {
      console.log('trigger error');
      this.errralert = true;
    }
    if (type === 'success') {
      console.log('trigger success');
      this.successalert = true;
    }
    this.message = msg;
    setTimeout(() => {
      this.errralert = false;
      this.successalert = false;
    }, 5000);
  }
}
