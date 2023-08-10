import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { ComponentsModule } from '../components/components.module';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { SearchComponent } from './search/search.component';
import { FooterComponent } from '../components/footer/footer.component';

import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../authguard/user-auth.guard';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyComponentComponent } from './my-component/my-component.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [UserAuthGuard],
  },


  {
    path: 'mydonation',
    component: MyComponentComponent,


    canActivate: [UserAuthGuard],
  },
  {
    path: 'profile',
    component: MyProfileComponent,
    canActivate: [UserAuthGuard],
  },
];


@NgModule({
  declarations: [HomeComponent, SearchComponent,FooterComponent],
  imports: [CommonModule, ComponentsModule,MatButtonModule,MatInputModule,RouterModule.forChild(routes)],
  exports: [HomeComponent, ComponentsModule],
})
export class PagesModule {}
