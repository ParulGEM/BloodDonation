import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DashboardNavbarComponent } from './dashboard-navbar/dashboard-navbar.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserlistComponent } from './dashboard-userlist/dashboard-userlist.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardDonationlistComponent } from './dashboard-donationlist/dashboard-donationlist.component';
import { DashboardRequestDonationComponent } from './dashboard-request-donation/dashboard-request-donation.component';
import { UserFormComponent } from './user-form/user-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DonationFormComponent } from './donation-form/donation-form.component';

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
      { path: 'useredit/:id', component: UserFormComponent },
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
    UserFormComponent,
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
