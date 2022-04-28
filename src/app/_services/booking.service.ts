import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, EMPTY, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  apiUrl:string=environment.apiUrl;
  userId:string="";
  totalBookings=new BehaviorSubject<number>(0);
  constructor(private http:HttpClient,private userService:UserService) { 
    userService.user.subscribe(resp=>{
      this.userId=resp._id;
      this.getTotalBookings(resp._id);
    })

    
  }


  bookHotel(data:any){
    return this.http.post(this.apiUrl+'/booking',data,{observe:'response'}).pipe(
      catchError(error=>{
        return this.handleError(error)
      })
    );
  }

  getBookings(){
    if(!this.userId) return EMPTY;
    return this.http.get(this.apiUrl+'/bookings/user/'+this.userId).pipe(
      catchError(error=>{
        return this.handleError(error)
      })
    );
  }

  getTotalBookings(userId:any){
    if(!userId) return;
    this.http.get(this.apiUrl+'/bookings/user/'+userId).pipe(
      catchError(error=>{
        return this.handleError(error)
      })
    ).subscribe((resp:any)=>{
      this.totalBookings.next(resp.length)
    })
  }

  cancelBooking(bookingId:string){
    return this.http.delete(this.apiUrl+'/bookings/'+bookingId).pipe(
      catchError(error=>{
        return this.handleError(error)
      })
    );
  }

  getYourHotelBookings(userId:any,params?:any){
    return this.http.get(this.apiUrl+'/bookings/'+userId,{params}).pipe(
      catchError(error=>{
        return this.handleError(error)
      })
    );
  }


  handleError(error:HttpErrorResponse){
    return throwError(error);
  }

  changeBookingStatus(bookingId:string,status:string){
    return this.http.patch(this.apiUrl+'/bookings/'+bookingId,{status}).pipe(
      catchError(error=>{
        return this.handleError(error)
      })
    );
  }
  
}
