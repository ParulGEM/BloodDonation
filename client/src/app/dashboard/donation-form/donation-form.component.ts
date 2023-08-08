import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'app-donation-form',
  templateUrl: './donation-form.component.html',
  styleUrls: ['./donation-form.component.css'],
})
export class DonationFormComponent implements OnInit {
  donationForm!: FormGroup;
  constructor(private formBuilder: FormBuilder) {}
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

  onSubmit(user: any): void {
    console.log(this.donationForm.value);
  }
}
