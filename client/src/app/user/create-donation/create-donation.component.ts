import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';

@Component({
  selector: 'app-create-donation',
  templateUrl: './create-donation.component.html',
  styleUrls: ['./create-donation.component.scss'],
})
export class CreateDonationComponent implements OnInit {
  donationForm!: FormGroup;
  bloodDonationServiceData: any;
  HttpCalls: any;

  constructor(
    private bloodDonationService: BloodDonationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonationService;
    this.HttpCalls = httpCallsService;
  }
  ngOnInit(): void {
    this.createDonationForm();
  }
  createDonationForm(): void {
    this.donationForm = new FormGroup({
      bloodGroup: new FormControl('', Validators.required),
      healthIssue: new FormControl('', Validators.required),
      lastDonationTime: new FormControl(''),
      descriptionHealthCondition: new FormControl(''),
      medicineConsumption: new FormControl(''),
      birthDate: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      occupation: new FormControl('', Validators.required),
      centerColonyVillage: new FormControl('', Validators.required),
      weight: new FormControl(''),
      pulse: new FormControl(''),
      hb: new FormControl(''),
      bp: new FormControl(''),
      temperature: new FormControl(''),
      tattooing: new FormControl(false),
      earPiercing: new FormControl(false),
      dentalExtraction: new FormControl(false),
      heartDisease: new FormControl(false),
      cancer: new FormControl(false),
      diabetes: new FormControl(false),
      hepatitisBC: new FormControl(false),
      std: new FormControl(false),
      typhoid: new FormControl(false),
      lungDisease: new FormControl(false),
      tuberculosis: new FormControl(false),
      allergicDisease: new FormControl(false),
      kidneyDisease: new FormControl(false),
      epilepsy: new FormControl(false),
      malaria: new FormControl(false),
      bleedingTendency: new FormControl(false),
      jaundice: new FormControl(false),
      faintingSpells: new FormControl(false),
      antibiotics: new FormControl(false),
      steroids: new FormControl(false),
      aspirin: new FormControl(false),
      vaccinations: new FormControl(false),
      alcohol: new FormControl(false),
      dogBiteRabiesVaccine: new FormControl(false),
      surgeryHistoryMinor: new FormControl(false),
      surgeryHistoryMajor: new FormControl(false),
      surgeryHistoryBloodTransfusion: new FormControl(false),
      AvailableDate: new FormControl('', Validators.required),
      AvailableTime: new FormControl('', Validators.required),
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

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.donationForm.valid) {
      const body = {
        ...this.donationForm.value,
        createdBy: this.bloodDonationServiceData.userData.userId,
      };
      this.HttpCalls.postApi('donation/create', body).subscribe(
        (response: any) => {
          if (response) {
            if (response.status) {
              this.bloodDonationServiceData.showAlert(
                'success',
                `success :${response.msg}`
              );
              this.router.navigate(['/search/']);
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
        },
        (error: any) => {
          this.bloodDonationServiceData.showAlert(
            'error',
            `error :${error.error?.msg}`
          );
        }
      );
    } else {
      this.donationForm.markAllAsTouched();
    }
  }
}
