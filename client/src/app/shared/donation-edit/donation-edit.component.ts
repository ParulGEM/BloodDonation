import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { HttpCallsService } from 'src/app/service/http-calls.service';
@Component({
  selector: 'app-donation-edit',
  templateUrl: './donation-edit.component.html',
  styleUrls: ['./donation-edit.component.scss'],
})
export class DonationEditComponent {
  donationForm!: FormGroup;
  bloodDonationServiceData: any;
  donationData: any = {};
  donationId: string = '';
  HttpCalls: any;

  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonationService;
    this.donationData = this.bloodDonationServiceData.donationEdit;
    this.HttpCalls = httpCallsService;
  }
  ngOnInit(): void {
    this.createDonationForm();
    this.route.paramMap.subscribe((params) => {
      this.donationId = params.get('id') || '';
    });
  }

  createDonationForm(): void {
    this.donationForm = new FormGroup({
      bloodGroup: new FormControl(
        this.donationData?.bloodGroup,
        Validators.required
      ),
      healthIssue: new FormControl('', Validators.required),
      lastDonationTime: new FormControl(this.donationData?.lastDonationTime),
      descriptionHealthCondition: new FormControl(
        this.donationData?.descriptionHealthCondition
      ),
      medicineConsumption: new FormControl(
        this.donationData?.medicineConsumption
      ),
      birthDate: new FormControl(
        this.donationData?.birthDate,
        Validators.required
      ),
      gender: new FormControl(this.donationData?.gender, Validators.required),
      occupation: new FormControl(
        this.donationData?.occupation,
        Validators.required
      ),
      centerColonyVillage: new FormControl(
        this.donationData?.centerColonyVillage,
        Validators.required
      ),
      weight: new FormControl(this.donationData?.weight),
      pulse: new FormControl(this.donationData?.pulse),
      hb: new FormControl(this.donationData?.hb),
      bp: new FormControl(this.donationData?.bp),
      temperature: new FormControl(this.donationData?.temperature),
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
    console.log(this.donationForm.value);
    event.preventDefault();
    if (this.donationForm.valid) {
      const body = {
        ...this.donationForm.value,
        createdBy: this.bloodDonationServiceData.donationEdit.createdBy._id,
        donationId: this.donationId,
      };
      this.HttpCalls.putApi('dashboard/donation', body).subscribe(
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
