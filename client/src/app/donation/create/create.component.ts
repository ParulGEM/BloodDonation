import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloodDonationService } from 'src/app/service/blood-donation.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  donationForm!: FormGroup;
  bloodDonationServiceData: any;

  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private formBuilder: FormBuilder
  ) {
    this.bloodDonationServiceData = bloodDonationService;
  }
  ngOnInit(): void {
    this.createDonationForm();
  }
  createDonationForm(): void {
    this.donationForm = this.formBuilder.group({
      bloodGroup: ['', Validators.required],
      healthIssue: ['', Validators.required],
      lastDonationTime: [''],
      descriptionHealthCondition: [''],
      medicineConsumption: [''],
      birthDate: ['', Validators.required],
      gender: ['', Validators.required],
      occupation: ['', Validators.required],
      centerColonyVillage: ['', Validators.required],
      weight: [''],
      pulse: [''],
      hb: [''],
      bp: [''],
      temperature: [''],
      tattooing: [false],
      earPiercing: [false],
      dentalExtraction: [false],
      heartDisease: [false],
      cancer: [false],
      diabetes: [false],
      hepatitisBC: [false],
      std: [false],
      typhoid: [false],
      lungDisease: [false],
      tuberculosis: [false],
      allergicDisease: [false],
      kidneyDisease: [false],
      epilepsy: [false],
      malaria: [false],
      bleedingTendency: [false],
      jaundice: [false],
      faintingSpells: [false],
      antibiotics: [false],
      steroids: [false],
      aspirin: [false],
      vaccinations: [false],
      alcohol: [false],
      dogBiteRabiesVaccine: [false],
      surgeryHistoryMinor: [false],
      surgeryHistoryMajor: [false],
      surgeryHistoryBloodTransfusion: [false],
      AvailableDate: ['', Validators.required],
      AvailableTime: ['', Validators.required],
    });
  }
  get bloodGroup() {
    return this.donationForm.get('bloodGroup');
  }

  get gender() {
    return this.donationForm.get('gender');
  }

  get birthDate() {
    return this.donationForm.get('birthDate');
  }

  get healthIssue() {
    return this.donationForm.get('healthIssue');
  }

  get occupation() {
    return this.donationForm.get('occupation');
  }

  get centerColonyVillage() {
    return this.donationForm.get('centerColonyVillage');
  }

  get lastDonationTime() {
    return this.donationForm.get('lastDonationTime');
  }
  get AvailableDate() {
    return this.donationForm.get('AvailableDate');
  }

  get AvailableTime() {
    return this.donationForm.get('AvailableTime');
  }
  async onSubmit(event: Event) {
    event.preventDefault();
    if (this.donationForm.valid) {
      const headers = new HttpHeaders().set(
        'Authorization',
        `Bearer ${this.bloodDonationServiceData.jwtToken}`
      );

      const response: any = await this.http
        .post(
          'http://localhost:5000/donation/create',
          {
            ...this.donationForm.value,
            createdBy: this.bloodDonationServiceData.userData.userId,
          },
          {
            headers,
          }
        )
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
    } else {
      alert('Not there');
    }
  }
}
