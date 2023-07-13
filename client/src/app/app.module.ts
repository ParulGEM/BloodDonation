import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserModule } from './user/user.module';
import { BloodDonationService } from './service/blood-donation.service';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { HomeComponent } from './page/home/home.component';

import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './donation/create/create.component';
import { DonationModule } from './donation/donation.module';
const routes: Routes = [
  {
    path: 'user',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registration', component: RegistrationComponent },
    ],
  },
  {
    path: 'donate',
    children: [{ path: 'create', component: CreateComponent }],
  },
];
@NgModule({
  declarations: [AppComponent, NavbarComponent, HomeComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    DonationModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: [RouterModule, ReactiveFormsModule],
})
export class AppModule {}
