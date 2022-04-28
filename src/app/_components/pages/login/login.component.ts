import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  message:string="";
  // message:string=""+String.fromCodePoint(0x1F621);

  constructor(private el: ElementRef,private userService:UserService,private router:Router) { 
    this.loginForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(7),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#._-])([a-zA-Z0-9@$!%*?&#._-]{7,})$/)])
    })
  }

  ngOnInit(){
    this.userService.isLoggedIn().subscribe(resp=>{
      if(resp) this.router.navigate(['/dashboard']);
    })
  }
  
  get formControl(){
    return this.loginForm.controls;
  }

  handleLogin(){
    if(this.loginForm.valid){
      this.userService.login(this.loginForm.value).subscribe(resp=>{
        if(resp){
          let token:any=resp.headers.get('x-auth-token');
          localStorage.setItem('token',token);
          this.userService.isLogin.next(true)
          this.router.navigate(['/dashboard']);
        }
      },(error:any)=>{
        this.message=error.error;
        this.router.navigate(['/login']);       
      })
    }else{
      for (const key of Object.keys(this.loginForm.controls)) {
        if (this.loginForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
     }
    }
  }

}
