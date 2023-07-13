import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BloodDonationService } from 'src/app/service/blood-donation.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  bloodDonationServiceData: any;
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService
  ) {
    this.bloodDonationServiceData = bloodDonationService;
  }
  donationForm = new FormGroup({
    age: new FormControl('', Validators.required),
    bloodGroup: new FormControl('', Validators.required),
    healthIssue: new FormControl('', Validators.required),
    lastDonationTime: new FormControl('', Validators.required),
    descriptionHealthCondition: new FormControl(''),
    medicineConsumption: new FormControl(''),
  });
  get age() {
    return this.donationForm.get('age');
  }
  get bloodGroup() {
    return this.donationForm.get('bloodGroup');
  }
  get healthIssue() {
    return this.donationForm.get('healthIssue');
  }
  get lastDonationTime() {
    return this.donationForm.get('lastDonationTime');
  }
  get descriptionHealthCondition() {
    return this.donationForm.get('descriptionHealthCondition');
  }
  get medicineConsumption() {
    return this.donationForm.get('medicineConsumption');
  }

  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.donationForm.valid) {
      const headers = new HttpHeaders();

      let bodyObj = {
        createdBy: this.bloodDonationServiceData.userData.userId,
        country: this.bloodDonationServiceData.userData.country,
        city: this.bloodDonationServiceData.userData.city,
        state: this.bloodDonationServiceData.userData.state,
        bloodGroup: this.bloodGroup?.value,
        heathissue: this.healthIssue?.value,
        lastDonationTime: `${this.lastDonationTime?.value}`,
        descriptionHealthCondition: this.descriptionHealthCondition?.value,
        medicineConsumption: this.medicineConsumption?.value,
      };
      const response: any = await this.http
        .post('http://localhost:5000/donation/create', bodyObj, {
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
