import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateComponent } from './create/create.component';
@NgModule({
  declarations: [CreateComponent],
  imports: [CommonModule, HttpClientModule, ReactiveFormsModule],
  exports: [CreateComponent],
})
export class DonationModule {}
