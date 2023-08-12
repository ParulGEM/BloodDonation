import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashboardDonationlistComponent } from './dashboard-donationlist/dashboard-donationlist.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardRequestDonationComponent } from './dashboard-request-donation/dashboard-request-donation.component';
import { DashboardUserlistComponent } from './dashboard-userlist/dashboard-userlist.component';

@NgModule({
  declarations: [
    DashboardDonationlistComponent,
    DashboardHomeComponent,
    DashboardNavbarComponent,
    DashboardRequestDonationComponent,
    DashboardUserlistComponent,
  ],
  imports: [CommonModule, AdminRoutingModule],
  exports: [DashboardNavbarComponent],
})
export class AdminModule {}
