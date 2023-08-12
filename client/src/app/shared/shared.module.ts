import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedRoutingModule } from './shared-routing.module';
import { DonationEditComponent } from './donation-edit/donation-edit.component';
import { FilterComponent } from './filter/filter.component';
import { FooterComponent } from './footer/footer.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { ViewDonationComponent } from './view-donation/view-donation.component';

@NgModule({
  declarations: [
    DonationEditComponent,
    FilterComponent,
    FooterComponent,
    UserEditComponent,
    ViewDonationComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, ReactiveFormsModule],
  exports: [
    FooterComponent,
    ViewDonationComponent,
    FilterComponent,
    UserEditComponent,
    DonationEditComponent,
  ],
})
export class SharedModule {}
