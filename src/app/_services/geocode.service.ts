import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodeService {
  apiUrl="http://api.positionstack.com/v1/forward?access_key=77513eea029da9ae664f68196ea4bd6e&query=";

  constructor(private http:HttpClient) {
    
   }

   getLatLong(address:string){
     return this.http.get(this.apiUrl+address);
   }
}
