import { TestBed } from '@angular/core/testing';

import { DashboardDonationService } from './dashboard-donation.service';

describe('DashboardDonationService', () => {
  let service: DashboardDonationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardDonationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
