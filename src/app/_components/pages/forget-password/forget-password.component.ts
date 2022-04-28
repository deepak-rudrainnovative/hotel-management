import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  forgetForm:FormGroup;
  isEmailSubmit:boolean=false;
  message:string=""
  constructor( private el: ElementRef,private router:Router,private userService:UserService) {
    this.forgetForm=new FormGroup({
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      otp:new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  get formControl(){
    return this.forgetForm.controls;
  }

  forgetPassword(){
      if(this.forgetForm.valid){
        this.userService.forgetPassword(this.forgetForm.value.email).subscribe((resp:any)=>{
          this.message="Otp Send In Mail "+resp.body.message;
          this.isEmailSubmit=!this.isEmailSubmit;
        },error=>{
          this.message=error.error;
        })
      }else{
        for (const key of Object.keys(this.forgetForm.controls)) {
          if (this.forgetForm.controls[key].invalid) {
            const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
            invalidControl.focus();
            break;
         }
       }
      }
  }

  verifyPassword(){
    if(this.forgetForm.controls?.['otp'].value!==""){
      const {email,otp}=this.forgetForm.value
      this.userService.verifyPassword(email,otp).subscribe(resp=>{
        let token:any=resp.headers.get('x-auth-token');
        localStorage.setItem('token',token);
        this.router.navigate([''])
      },error=>{
        this.message=error.error;
      })
    }else{
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + 'otp' + '"]');
          invalidControl.focus();
       }
  }

}
