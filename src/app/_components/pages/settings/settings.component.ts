import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subscription } from 'rxjs';
import { BookingService } from 'src/app/_services/booking.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit,OnDestroy {
  hotels:any;
  bookings:any;
  hotelSub!:Subscription;
  bookingSub!:Subscription;
  constructor(private hotelService:HotelService,private loadingBar: LoadingBarService,private toastrService:ToastrService,private bookingService:BookingService) { 
    loadingBar.start();
  }

  ngOnInit(): void {
    let token:any=localStorage.getItem('token')
    let user:any=token && jwtDecode(token)
    this.hotelSub=this.hotelService.getYourHotels(user?._id).subscribe(resp=>{
      this.hotels=resp.body;
      this.loadingBar.complete()
    });
    this.bookingSub=this.bookingService.getYourHotelBookings(user?._id).subscribe(resp=>{
      this.bookings=resp;
    })
  }
  ngOnDestroy(){
    this.hotelSub.unsubscribe();
    this.bookingSub.unsubscribe();
  }

  deleteHotel(hotelId:string){
    this.hotelService.deleteHotel(hotelId).subscribe(resp=>{
      let hotels=this.hotels.filter((hotel:any)=>hotel._id!==hotelId);
      this.hotels=hotels;
      this.toastrService.success("Hotel Deleted","")
    })
  }

  changeStatus(event:Event,bookingId:string){
    let data:any=event.target;
    let index=this.bookings.findIndex((booking:any)=>booking._id==bookingId)
    if(data.checked){
      this.bookingService.changeBookingStatus(bookingId,'complete').subscribe(resp=>{
        this.bookings[index].status='complete';
      })
      
    }else{
      this.bookingService.changeBookingStatus(bookingId,'pending').subscribe(resp=>{
          this.bookings[index].status='pending';
      })
    }
  }

}
