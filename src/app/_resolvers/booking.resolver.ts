import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { BookingService } from '../_services/booking.service';

@Injectable({
  providedIn: 'root'
})
export class BookingResolver implements Resolve<any> {

  constructor(private bookingService:BookingService){

  }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    return this.bookingService.getBookings();
  }
}
