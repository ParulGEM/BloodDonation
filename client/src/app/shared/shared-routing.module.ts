import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthGuard } from '../service/authguard/user-auth.guard';
import { UserEditComponent } from './user-edit/user-edit.component';
import { DonationEditComponent } from './donation-edit/donation-edit.component';

const routes: Routes = [
  {
    path: 'user/:id',
    component: UserEditComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'donation/:id',
    component: DonationEditComponent,
    canActivate: [UserAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
