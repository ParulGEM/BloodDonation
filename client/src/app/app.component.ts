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
  }
  title = 'client';
}
