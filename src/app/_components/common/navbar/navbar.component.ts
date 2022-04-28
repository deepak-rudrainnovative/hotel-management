import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable, Subscription, toArray } from 'rxjs';
import { BookingService } from 'src/app/_services/booking.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,OnDestroy {
  user:any={}
  isLoggedIn : Observable<boolean>;
  imgUrl:string=environment.imgUrl;
  authSubscription:Subscription=new Subscription();
  bookingSubscription:Subscription=new Subscription()

  constructor( public authService : UserService,private router:Router,public bookingService:BookingService) {
    this.isLoggedIn = authService.isLoggedIn();
  }

  ngOnInit(): void {
    this.authSubscription=this.authService.user.subscribe(resp=>{
      this.user=resp;
    });
    
    
  }
  
  handleLogout(){
    this.authService.logout();
    this.router.navigate(['/login'])
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
    this.bookingSubscription.unsubscribe();
  }
}
