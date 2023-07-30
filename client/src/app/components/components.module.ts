import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewDonationComponent } from './view-donation/view-donation.component';

@NgModule({
  declarations: [FilterComponent, ViewDonationComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,

  ],
  exports: [FilterComponent, ViewDonationComponent],
})
export class ComponentsModule {}
