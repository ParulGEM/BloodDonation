import { Component } from '@angular/core';
import { BloodDonationService } from './service/blood-donation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  bloodDonationServiceData :any;
  constructor(private bloodDonation : BloodDonationService){
    
    this.bloodDonationServiceData =bloodDonation;
  }
  title = 'client';
}
