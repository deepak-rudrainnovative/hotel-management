import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './_components/admin/dashboard/dashboard.component';
import { HotelComponent } from './_components/common/hotel/hotel.component';
import { NotFoundComponent } from './_components/common/not-found/not-found.component';
import { BookingComponent } from './_components/pages/booking/booking.component';
import { ContactComponent } from './_components/pages/contact/contact.component';
import { CreateHotelComponent } from './_components/pages/create-hotel/create-hotel.component';
import { ForgetPasswordComponent } from './_components/pages/forget-password/forget-password.component';
import { HomeComponent } from './_components/pages/home/home.component';
import { HotelSettingsComponent } from './_components/pages/hotel-settings/hotel-settings.component';
import { LoginComponent } from './_components/pages/login/login.component';
import { ProfileComponent } from './_components/pages/profile/profile.component';
import { RegisterComponent } from './_components/pages/register/register.component';
import { SettingsComponent } from './_components/pages/settings/settings.component';
import { AuthenticationGuard } from './_helper/authentication.guard';
import { BookingResolver } from './_resolvers/booking.resolver';

const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'admin',component:DashboardComponent,canActivate:[AuthenticationGuard]},
  {path:'create-hotel',component:CreateHotelComponent,canActivate:[AuthenticationGuard]},
  {path:'forget-password',component:ForgetPasswordComponent},
  {path:'profile',component:ProfileComponent,canActivate:[AuthenticationGuard]},
  {path:'contact',component:ContactComponent,canActivate:[AuthenticationGuard]},
  {path:'bookings',component:BookingComponent,canActivate:[AuthenticationGuard],resolve:{bookings:BookingResolver}},
  {path:'settings',component:SettingsComponent,canActivate:[AuthenticationGuard]},
  {path:'dashboard',component:HomeComponent,canActivate:[AuthenticationGuard]},
  {path:'hotel/:id',component:HotelComponent,canActivate:[AuthenticationGuard]},
  {path:'settings/hotel/:id',component:HotelSettingsComponent,canActivate:[AuthenticationGuard]},
  {path:'',redirectTo:'/dashboard',pathMatch:'full'},
  {path:'**' ,component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
