import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { BookingService } from 'src/app/_services/booking.service';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { animate, state, style, transition, trigger } from '@angular/animations';
@Component({
  animations:[
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(1000)),
    ]),
  ],
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings:any[]=[];
  imgUrl:string=environment.imgUrl;
  constructor(private route:ActivatedRoute,public location:Location,private loadingBar: LoadingBarService,private bookingService:BookingService,private toastr:ToastrService) { 
    loadingBar.start()
  }

  ngOnInit(): void {
    this.bookings=this.route.snapshot.data?.['bookings'];
    this.loadingBar.complete();
    // this.bookingService.totalBookings.next(this.bookings?.length)
  }


  cancelBooking(bookingId:string){
      let check=confirm("Are you Sure to Cancel Booking");
      if(check){
        let bookings=this.bookings.filter(booking=>booking._id!==bookingId);
        this.bookings=bookings;
        this.bookingService.cancelBooking(bookingId).subscribe(resp=>{
        this.toastr.success('Booking Cancel Done', 'Cancel Booking');
        this.bookingService.totalBookings.next(this.bookingService.totalBookings.value-1)
        })
      }
      
  }

}
