import { Component, OnInit } from '@angular/core';
import { BloodDonationService } from './service/blood-donation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  bloodDonationServiceData: any;
  constructor(
    private bloodDonation: BloodDonationService,
    private http: HttpClient
  ) {
    this.bloodDonationServiceData = bloodDonation;
  }
  async ngOnInit() {
    this.bloodDonationServiceData.loginBydeafault();
    const headers = new HttpHeaders();
    const response: any = await this.http
      .get('http://localhost:5000/donation/filter', { headers })
      .toPromise();

    if (response) {
      if (response.status) {
        this.bloodDonationServiceData.donationArray = response.data;
      } else {
        this.bloodDonationServiceData.showAlert('error', response.msg);
      }
    } else {
      this.bloodDonationServiceData.showAlert('error', 'internal server error');
    }

  }
  title = 'client';
}
