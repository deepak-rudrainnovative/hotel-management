
import { Component } from '@angular/core';
import { BookingService } from './_services/booking.service';
import { UserService } from './_services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  title = 'hotel-management';

  constructor(public authService:UserService,private bookinService:BookingService){
      authService.getUser();
  }

}
