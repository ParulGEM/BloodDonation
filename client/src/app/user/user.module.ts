import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
];

@NgModule({
  declarations: [RegistrationComponent, LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(routes),
  ],
  exports: [RegistrationComponent, LoginComponent],
})
export class UserModule {

}
