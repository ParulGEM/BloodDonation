import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserlistComponent } from './dashboard-userlist/dashboard-userlist.component';
import { DashboardDonationlistComponent } from './dashboard-donationlist/dashboard-donationlist.component';
import { DashboardRequestDonationComponent } from './dashboard-request-donation/dashboard-request-donation.component';
import { AdminAuthGuard } from '../service/authguard/admin-auth.guard';

const routes: Routes = [
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
