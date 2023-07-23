import { Component } from '@angular/core';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.css'],
})
export class ViewDonationComponent {
  displayedColumns: string[] = [
    'country',
    'city',
    'state',
    'bloodGroup',
    'heathissue',
    'lastDonationTime',
    'descriptionHealthCondition',
    'medicineConsumption',
    'add',
  ];
  bloodDonationServiceData: any;
  constructor(
    private router: Router,
    private bloodDonation: BloodDonationService,
    private http: HttpClient
  ) {
    this.bloodDonationServiceData = bloodDonation;
    console.log('donationArry-->', this.bloodDonationServiceData.donationArray);
  }

  addDonation(donation: any) {
    this.router.navigate(['details', donation._id]);
    // const recipienter = this.bloodDonationServiceData.userData.userId;
    // if (!recipienter) {
    //   this.bloodDonationServiceData.showAlert('error', 'Login First');
    //   this.router.navigate(['user/login']);
    //   return;
    // }

    // const headers = new HttpHeaders();
    // this.http
    //   .post(
    //     'http://localhost:5000/donation/request',
    //     { recipienter, donationId: donation._id },
    //     { headers }
    //   )
    //   .subscribe(
    //     (response: any) => {
    //       if (response) {
    //         if (response.status) {
    //           this.bloodDonationServiceData.showAlert('success', response.msg);
    //         } else {
    //           this.bloodDonationServiceData.showAlert('error', response.msg);
    //         }
    //       } else {
    //         this.bloodDonationServiceData.showAlert(
    //           'error',
    //           'internal server error'
    //         );
    //       }
    //     },
    //     (error) => {
    //       console.error(error);
    //     }
    //   );
  }
}
