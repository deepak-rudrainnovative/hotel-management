import { Component, ElementRef, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm:FormGroup;
  message:any="";

  constructor(private el: ElementRef,private router:Router,private userService:UserService) { 
    this.registerForm=new FormGroup({
      name:new FormControl('',[Validators.required,Validators.minLength(3)]),
      email:new FormControl('',[Validators.required,Validators.pattern(/\S+@\S+\.\S+/)]),
      password:new FormControl('',[Validators.required,Validators.minLength(7),Validators.pattern(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&#._-])([a-zA-Z0-9@$!%*?&#._-]{7,})$/)])
    })
  }

  ngOnInit(): void {
    
  }
  
  get formControl(){
    return this.registerForm.controls;
  }

  handleRegister(){
    
    if(this.registerForm.valid){
      
        this.userService.registerUser(this.registerForm.value).subscribe(resp=>{
          this.router.navigate(['/login']);
        },(error:any)=>{
          this.message=error.error
        })
    }else{
      for (const key of Object.keys(this.registerForm.controls)) {
        if (this.registerForm.controls[key].invalid) {
          const invalidControl = this.el.nativeElement.querySelector('[formcontrolname="' + key + '"]');
          invalidControl.focus();
          break;
       }
     }
    }
  }


}
