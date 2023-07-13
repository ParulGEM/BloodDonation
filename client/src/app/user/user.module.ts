import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [CommonModule, ReactiveFormsModule, HttpClientModule],
  exports: [RegistrationComponent,LoginComponent],
})
export class UserModule {}
