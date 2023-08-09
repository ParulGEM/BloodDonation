import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewDonationComponent } from './view-donation/view-donation.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DonationEditComponent } from './donation-edit/donation-edit.component';

@NgModule({
  declarations: [FilterComponent, ViewDonationComponent, UserEditComponent, DonationEditComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  exports: [FilterComponent, ViewDonationComponent],
})
export class ComponentsModule {}
