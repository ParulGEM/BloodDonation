import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchComponent } from './search/search.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { DonationDetailsComponent } from './donation-details/donation-details.component';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserAuthGuard } from '../service/authguard/user-auth.guard';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  {
    path: 'details/:id',
    component: DonationDetailsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'mydonation',
    component: MyDonationsComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [UserAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
