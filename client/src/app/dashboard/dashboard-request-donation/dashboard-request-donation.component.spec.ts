import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRequestDonationComponent } from './dashboard-request-donation.component';

describe('DashboardRequestDonationComponent', () => {
  let component: DashboardRequestDonationComponent;
  let fixture: ComponentFixture<DashboardRequestDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardRequestDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRequestDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
