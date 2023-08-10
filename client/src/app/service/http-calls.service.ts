import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BloodDonationService } from './blood-donation.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HttpCallsService {
  bloodDonationServiceData: any;
  url = environment.apiURL;
  headers: any;
  constructor(
    private http: HttpClient,
    private bloodDonationService: BloodDonationService
  ) {
    this.bloodDonationServiceData = bloodDonationService;
    this.headers = new HttpHeaders().set(
      'Authorization',
      `Bearer ${this.bloodDonationServiceData.jwtToken || ''}`
    );
  }
  putApi(endPonit: string, body: any) {
    return this.http.put(this.url + endPonit, body, {
      headers: this.headers,
    });
  }

  deleteApi(endPonit: string, params: any) {
    return this.http.delete(this.url + endPonit, {
      headers: this.headers,
      params,
    });
  }
  getApi(endPonit: string, params: any) {
    return this.http.get(this.url + endPonit, {
      headers: this.headers,
      params,
    });
  }
  postApi(endPonit: string, body: any) {
    return this.http.post(this.url + endPonit, body, {
      headers: this.headers,
    });
  }
}
