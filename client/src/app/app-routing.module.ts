import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/home/home.component';
import { CreateDonationComponent } from './user/create-donation/create-donation.component';
import { UserEditComponent } from './shared/user-edit/user-edit.component';
import { DonationEditComponent } from './shared/donation-edit/donation-edit.component';
import { UserAuthGuard } from './service/authguard/user-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'donate',
    children: [
      {
        path: 'create',
        component: CreateDonationComponent,
        canActivate: [UserAuthGuard],
      },
    ],
  },
  {
    path: 'useredit/:id',
    component: UserEditComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'donationedit/:id',
    component: DonationEditComponent,
    canActivate: [UserAuthGuard],
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'user',
    loadChildren: () => import('./user/user.module').then((m) => m.UserModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
