import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  apiUrl:string=environment.apiUrl;

  constructor(private http:HttpClient) { 

  }


  getNearByHotels(){

  }

  getHotelById(ID:string){
    return this.http.get(this.apiUrl+'/hotel/'+ID,{observe:'response'});
  }

  getAllHotels(){
    return this.http.get(this.apiUrl+'/hotel'+'?limit=30',{observe:'response'});
  }

  getYourHotels(userID:string){
    return this.http.get(this.apiUrl+'/hotel/owner/'+userID+'?limit=5',{observe:'response'});
  }

  registerHotel(data:any){
    return this.http.post(this.apiUrl+'/hotel',data,{observe:'response'});
  }

  updateHotel(hotelId:string,data:any){
    return this.http.patch(this.apiUrl+'/hotel/'+hotelId,data,{observe:'response'})
  }

  deleteHotelRating(hotelId:string,data:any){
    return this.http.patch(this.apiUrl+'/hotel/remove-rating/'+hotelId,data,{observe:'response'})
  }

  deleteHotel(hotelId:string){
    return this.http.delete(this.apiUrl+'/hotel/'+hotelId,{observe:'response'});
  }
}
