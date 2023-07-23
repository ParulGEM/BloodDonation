import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserlistComponent } from './dashboard-userlist/dashboard-userlist.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardDonationlistComponent } from './dashboard-donationlist/dashboard-donationlist.component';
import { DashboardRequestDonationComponent } from './dashboard-request-donation/dashboard-request-donation.component';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
      },
      {
        path: 'users',
        component: DashboardUserlistComponent,
      },
      {
        path: 'donation-list',
        component: DashboardDonationlistComponent,
      },
      {
        path: 'donation-request',
        component: DashboardRequestDonationComponent,
      },
    ],
  },
];

@NgModule({
  declarations: [
    DashboardNavbarComponent,
    DashboardHomeComponent,
    DashboardUserlistComponent,
    DashboardDonationlistComponent,
    DashboardRequestDonationComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatIconModule,

    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  exports: [DashboardNavbarComponent],
})
export class DashboardModule {}
