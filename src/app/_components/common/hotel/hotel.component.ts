import { animate, state, style, transition, trigger } from '@angular/animations';
import { Location } from '@angular/common';
import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Subscription } from 'rxjs';
import { BookingService } from 'src/app/_services/booking.service';
import { HotelService } from 'src/app/_services/hotel.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';
@Component({
  animations: [
    trigger('balloonEffect', [
      state('initial', style({
        transform: 'scale(1)'
      })),
      state('final', style({
        transform: 'scale(1.5)'
      })),
      transition('final=>initial', animate('1000ms')),
      transition('initial=>final', animate('1500ms'))
    ]),
  ],
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit,OnDestroy {
  
  hotelSubcription:Subscription=new Subscription;
  userSubcription:Subscription=new Subscription;
  hotel:any;
  message:string='';
  bookingMessage:string='';
  imgUrl:string=environment.imgUrl;
  bookingForm:FormGroup;
  rating:number=0;
  rate:number=0;
  isRated:boolean=false;
  hotel_ID:string='';
  user_ID:string='';
  form:FormGroup;
  isBooked:boolean=false;
  currentState = 'initial';

  changeState() {
    this.currentState = this.currentState === 'initial' ? 'final' : 'initial';
  }
  

  constructor(private route:ActivatedRoute,private hotelService:HotelService,public location:Location,private el:ElementRef,private userService:UserService,private bookingService:BookingService,private loadingBar: LoadingBarService) { 

    this.bookingForm=new FormGroup({
      user:new FormControl('',[Validators.required]),
      hotel:new FormControl('',[Validators.required]),
      commingDate:new FormControl('',[Validators.required]),
      leaveDate:new FormControl('',[Validators.required]),
      numberOfPeople:new FormControl('',[Validators.required,Validators.min(1),Validators.max(10)]),
    })
    this.rating=0;
    this.form = new FormGroup({
      rating: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.hotel_ID=this.route.snapshot.paramMap.get('id')||'';
    this.loadingBar.start();
    this.userSubcription=this.userService.user.subscribe(user=>{
      this.user_ID=user._id;
      this.bookingForm.patchValue({user:user._id,hotel:this.hotel_ID})
    })
    this.hotelSubcription=this.hotelService.getHotelById(this.hotel_ID).subscribe(resp=>{
      this.hotel=resp.body;
      let isRated=this.hotel?.ratings.find((hotel:any)=>hotel.user===this.user_ID)
      this.rate=isRated?.rate;
      this.form.controls?.['rating'].setValue(this.rate);
      let TotalRate=0;
      this.hotel?.ratings.forEach((hotel:any)=>TotalRate=TotalRate+hotel?.rate);
      this.rating=TotalRate? TotalRate/this.hotel?.ratings.length:0;
    
      if(isRated){
        this.isRated=true;
      }
    },(error:any)=>{
      this.message=error.error;
    });
    this.bookingService.getBookings().subscribe((bookings:any)=>{
      let booked=bookings.filter((booking:any)=>booking?.hotel?._id.toString()===this.hotel_ID);
      if(booked.length>0){
        this.isBooked=!this.isBooked;
      }
    })
    this.loadingBar.complete();
  }

  ngOnDestroy(){
    this.userSubcription.unsubscribe();
    this.hotelSubcription.unsubscribe();
  }

  get formControl(){
    return this.bookingForm.controls;
  }
 
  handleBooking(){

    if(this.bookingForm.valid){ 
      if(this.bookingForm.value.commingDate<new Date().toISOString().slice(0,10)){
        this.bookingForm.controls?.['commingDate'].setErrors({isInvalidCommingDate:true});
      }else if(this.bookingForm.value.commingDate>this.bookingForm.value.leaveDate)
      { 
        this.bookingForm.controls?.['leaveDate'].setErrors({isInvalidLeaveDate:true});
      }else{
        this.bookingService.bookHotel(this.bookingForm.value).subscribe(resp=>{
          this.bookingMessage="Booking Success";
          this.bookingForm.patchValue({commingDate:null,leaveDate:null,numberOfPeople:null});
          this.bookingService.totalBookings.next(this.bookingService.totalBookings.value+1);
          this.bookingForm.markAsUntouched();
          
        },(error)=>{
          if(error.status===400){
            this.bookingMessage=error.error;
            this.bookingForm.patchValue({commingDate:null,leaveDate:null,numberOfPeople:null});
            this.bookingForm.markAsUntouched()
          }
        })
      }
       
    }else{
    for (const key of Object.keys(this.bookingForm.controls)) {
      if (this.bookingForm.controls[key].invalid) {
        const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
         invalidControl.focus();
        break;
     }
     }
    }
  }

  bookingInitailize(){
    this.bookingMessage='';
  }

  giveRating(){
      this.isRated=true;
      let rate=this.form.value.rating;
      this.hotelService.updateHotel(this.hotel_ID,{user:this.user_ID,rate}).subscribe((res:any)=>{
        this.hotel.ratings=res.body.ratings;
        let TotalRate=0;
        this.rate=rate;
        res.body.ratings.forEach((hotel:any)=>TotalRate=TotalRate+hotel?.rate);
        this.rating=TotalRate>0?(TotalRate/res.body.ratings.length):0;
      })
  }

  deleteRating(){
    this.isRated=false;
    this.hotelService.deleteHotelRating(this.hotel_ID,{user:this.user_ID}).subscribe((resp:any)=>{
      this.hotel.ratings=resp.body?.ratings;
      let TotalRate=0;
        this.form.controls?.['rating'].setValue('');
        resp.body?.ratings.forEach((hotel:any)=>TotalRate=TotalRate+hotel?.rate);
        this.rating=TotalRate>0?TotalRate/resp.body?.ratings.length:0;
    });
  }
}
