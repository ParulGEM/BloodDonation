import { Component, ViewChild } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from 'src/app/service/blood-donation.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpCallsService } from 'src/app/service/http-calls.service';
@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css'],
})
export class FilterComponent {
  HttpCalls: any;
  countryArry = [];
  stateArry = [];
  cityarry = [];
  bloodDonationServiceData: any;
  searchForm: FormGroup = new FormGroup({});
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService,
    private formBuilder: FormBuilder,
    private httpCallsService: HttpCallsService
  ) {
    this.bloodDonationServiceData = bloodDonationService;
    this.HttpCalls = httpCallsService;
  }
  ngOnInit() {
    this.searchForm = this.formBuilder.group({
      country: [''],
      city: [''],
      state: [''],
      bloodGroup: [''],
    });

    const paramsState = new HttpParams().set('key', 'state');
    const paramscity = new HttpParams().set('key', 'city');
    const paramsCountry = new HttpParams().set('key', 'country');

    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationService.jwtToken}`
    );

    // this.http
    //   .get('http://localhost:5000/donation/location', {
    //     params: paramsCountry,
    //     headers,
    //   })

    this.HttpCalls.getApi('donation/location', paramsCountry).subscribe(
      (response: any) => {
        this.countryArry = response.data; // Assign response data to countryArry
      },
      (error: any) => {
        console.log(error);
        this.countryArry = []; // Assign empty array in case of an error
      }
    );
    this.HttpCalls.getApi('donation/location', paramsState).subscribe(
      (response: any) => {
        console.log(response);
        this.stateArry = response.data; // Assign response data to countryArry
      },
      (error: any) => {
        console.log(error);
        this.stateArry = []; // Assign empty array in case of an error
      }
    );
    this.HttpCalls.getApi('donation/location', paramscity).subscribe(
      (response: any) => {
        this.cityarry = response.data; // Assign response data to countryArry
      },
      (error: any) => {
        console.log(error);
        this.cityarry = []; // Assign empty array in case of an error
      }
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const countryValue = this.searchForm.get('country')?.value;
    const cityValue = this.searchForm.get('city')?.value;
    const stateValue = this.searchForm.get('state')?.value;
    const bloodGroupValue = this.searchForm.get('bloodGroup')?.value;

    let params: any = {};
    // available: true
    // params.append('available', 'true');
    if (countryValue) {
      params['country'] = countryValue;
    }
    if (cityValue) {
      params['city'] = cityValue;
    }
    if (stateValue) {
      params['state'] = stateValue;
    }
    if (bloodGroupValue) {
      //params.bloodGroup=bloodGroupValue
      params['bloodGroup'] = bloodGroupValue;
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationService.jwtToken}`
    );
    // const headers = new HttpHeaders()
    this.HttpCalls.getApi('donation/filter', params).subscribe(
      (response: any) => {
        console.log(response);
        // Handle the response
        if (response.status) {
          this.bloodDonationServiceData.donationArray = response.data;
        } else {
          this.bloodDonationServiceData.showAlert('error', response.msg);
        }
      },
      (error: any) => {
        console.error(error);
      }
    );

    this.searchForm.reset();
  }
}
