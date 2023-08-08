import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardDonationService {
  constructor() {}
  userList: [] = [];
  donationList: [] = [];
  requestedDonationData: [] = [];
  editUserData: {} = {};
}
