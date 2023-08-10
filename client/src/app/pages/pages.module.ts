import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from '../components/footer/footer.component';

import { RouterModule, Routes } from '@angular/router';

@NgModule({
  declarations: [HomeComponent, SearchComponent,FooterComponent],
  imports: [CommonModule, ComponentsModule,MatButtonModule,MatInputModule,RouterModule],
  exports: [HomeComponent, ComponentsModule],
})
export class PagesModule {}
