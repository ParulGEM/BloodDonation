import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserRoutingModule } from './user-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { DonationDetailsComponent } from './donation-details/donation-details.component';
import { MatCardModule } from '@angular/material/card';
import { MyDonationsComponent } from './my-donations/my-donations.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { SearchComponent } from './search/search.component';
import { RegistrationComponent } from './registration/registration.component';
import { CreateDonationComponent } from './create-donation/create-donation.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    DonationDetailsComponent,
    MyDonationsComponent,
    MyProfileComponent,
    SearchComponent,
    RegistrationComponent,
    CreateDonationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    SharedModule,
  ],
  exports: [NavbarComponent, HomeComponent],
})
export class UserModule {}
