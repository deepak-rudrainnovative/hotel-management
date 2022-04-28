import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string=environment.apiUrl;
  user=new BehaviorSubject<any>({});
  isLogin = new BehaviorSubject<boolean>(this.hasToken());

  constructor(private http:HttpClient) {
      
  }

  private hasToken() : boolean {
    return !!localStorage.getItem('token');
  }

  getUser(){
    let token:any=localStorage.getItem('token')
    let user:any=token && jwtDecode(token)
    if(user){
      this.http.get(this.apiUrl+'/user/'+user?._id).subscribe((resp:any)=>{
        this.user.next(resp);
        localStorage.setItem('address',resp.address)
      });
    }
  }

  registerUser(user:any){
      return this.http.post(this.apiUrl+'/user',user,{observe:'response'});
  }

  login(user:any){
    
    return this.http.post(this.apiUrl+'/auth/login',user,{observe:'response'});
  }

  logout() : void {
    localStorage.removeItem('token');
    this.isLogin.next(false);
  }

   isLoggedIn() : Observable<boolean> {
    return this.isLogin.asObservable();
   }

   editUser(user:any){
     return this.http.patch(this.apiUrl+'/user/'+user?._id,user,{observe:'response'});
   }

   forgetPassword(email:string){
     return this.http.put(this.apiUrl+'/user/forget-password',{email},{observe:'response'});
   }

   verifyPassword(email:string,otp:string){
    return this.http.put(this.apiUrl+'/user/verify-password',{email,otp},{observe:'response'});
  }

   uploadProfile(fileData:any){
    let token:any=localStorage.getItem('token')
    let user:any=token && jwtDecode(token);
    return this.http.patch(this.apiUrl+'/user/upload/'+user?._id,fileData,{observe:'response'});
   }
}
