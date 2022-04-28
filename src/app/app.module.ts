import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgSelectModule } from '@ng-select/ng-select';

import { LoginComponent } from './_components/pages/login/login.component';
import { RegisterComponent } from './_components/pages/register/register.component';
import { HomeComponent } from './_components/pages/home/home.component';
import { ForgetPasswordComponent } from './_components/pages/forget-password/forget-password.component';
import { DashboardComponent } from './_components/admin/dashboard/dashboard.component';
import { NotFoundComponent } from './_components/common/not-found/not-found.component';
import { NavbarComponent } from './_components/common/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationGuard } from './_helper/authentication.guard';
import { ProfileComponent } from './_components/pages/profile/profile.component';
import { CreateHotelComponent } from './_components/pages/create-hotel/create-hotel.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { PaginationComponent } from './_components/common/pagination/pagination.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { HotelComponent } from './_components/common/hotel/hotel.component';
import { CounterComponent } from './_components/common/counter/counter.component';
import { TodoComponent } from './_components/todo/todo.component'

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { counterReducer } from './store/reducer';
import { environment } from 'src/environments/environment';
import { SettingsComponent } from './_components/pages/settings/settings.component';
import { AgmCoreModule } from '@agm/core';
import { JwtModule } from '@auth0/angular-jwt';
import { BookingComponent } from './_components/pages/booking/booking.component';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { HttpInterceptorService } from './_interceptor/http-interceptor.service';
export function tokenGetter() {
  return localStorage.getItem("token");
}
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { ToastrModule } from 'ngx-toastr';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { ContactComponent } from './_components/pages/contact/contact.component';
import { HotelSettingsComponent } from './_components/pages/hotel-settings/hotel-settings.component';
import { ImageCropperModule } from 'ngx-image-cropper';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ForgetPasswordComponent,
    DashboardComponent,
    NotFoundComponent,
    NavbarComponent,
    ProfileComponent,
    CreateHotelComponent,
    PaginationComponent,
    HotelComponent,
    CounterComponent,
    TodoComponent,
    SettingsComponent,
    BookingComponent,
    ContactComponent,
    HotelSettingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgSelectModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    StoreModule.forRoot({ count: counterReducer }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBV3YBUgcHduLOPBjlAj8RLlyrJQXkLgqk',
      libraries: ['places']
    }),
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["http://localhost:5000","http://192.168.1.56:5000"],
        disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
    NgxStarRatingModule,
    LoadingBarRouterModule,
    LoadingBarModule,
    ToastrModule.forRoot(),
    PickerModule,
    AngularEditorModule,
    ImageCropperModule
  ],
  providers: [
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { 

  constructor(){
     
  
  }
}
