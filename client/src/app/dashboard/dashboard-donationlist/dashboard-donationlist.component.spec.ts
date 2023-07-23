import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDonationlistComponent } from './dashboard-donationlist.component';

describe('DashboardDonationlistComponent', () => {
  let component: DashboardDonationlistComponent;
  let fixture: ComponentFixture<DashboardDonationlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardDonationlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardDonationlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
