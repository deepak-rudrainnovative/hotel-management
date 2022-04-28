import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, Subscription } from 'rxjs';

import {UserService} from '../_services/user.service'

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
   currentUser :Subscription;
   isLogin$:boolean=false;
  
  constructor(private router: Router,public userService: UserService){
    this.currentUser = userService.isLoggedIn().subscribe(
      (resp) => {
          this.isLogin$=resp;
      }
     );
  }
   canActivate():boolean{
    
    if(!this.isLogin$){
      this.router.navigate(['/login']);
    }
    return this.isLogin$;
    
  }
  
}
