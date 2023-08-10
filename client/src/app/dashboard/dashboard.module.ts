import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserlistComponent } from './dashboard-userlist/dashboard-userlist.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardDonationlistComponent } from './dashboard-donationlist/dashboard-donationlist.component';
import { DashboardRequestDonationComponent } from './dashboard-request-donation/dashboard-request-donation.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DonationFormComponent } from './donation-form/donation-form.component';
import { AdminAuthGuard } from '../authguard/admin-auth.guard';

const routes: Routes = [
  {
    path: 'dashboard',
    children: [
      {
        path: '',
        component: DashboardHomeComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'users',
        component: DashboardUserlistComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'donation-list',
        component: DashboardDonationlistComponent,
        canActivate: [AdminAuthGuard],
      },
      {
        path: 'donation-request',
        component: DashboardRequestDonationComponent,
        canActivate: [AdminAuthGuard],
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
    DonationFormComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports: [DashboardNavbarComponent],
})
export class DashboardModule {}
