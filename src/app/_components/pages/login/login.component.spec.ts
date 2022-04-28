import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Router, Routes } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';
import { HomeComponent } from '../home/home.component';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let emailControl:any;
  let passwordControl:any;
  let service:UserService;
  let user={email:'testemail@abc.com',password:"Test@123"};
  let routes:Routes=[
    {path:'dashboard',component:HomeComponent}
  ];
  // let location: Location;
  // let router: Router;
  beforeEach(async () => {
    service = jasmine.createSpyObj<UserService>(
      'UserService',
      { 
        apiUrl:environment.apiUrl,
        user:new BehaviorSubject<any>({}),
        isLogin:new BehaviorSubject<boolean>(false),
        login:of<any>(user),
        isLoggedIn:of<any>(true)
      }
    );
    // router = TestBed.get(Router);
    // location = TestBed.get(Location);
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes(routes),HttpClientModule],
      declarations: [ LoginComponent ],
      providers:[HttpClient,
        { provide:UserService, useValue: service }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    emailControl=component.loginForm.get('email');
    passwordControl=component.loginForm.get('password');
    component.ngOnInit();
    
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid if email & password empty',()=>{
    emailControl?.setValue('');
    passwordControl?.setValue('');
    expect(emailControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
  });

  it('should form valid if email & password correct',()=>{
    emailControl?.setValue(user.email);
    passwordControl?.setValue(user.password);
    expect(emailControl?.valid).toBeTruthy();
    expect(passwordControl?.valid).toBeTruthy();
  });

  it('should if login call without fillings form',()=>{
    component.handleLogin();
    expect(component.loginForm.invalid).toBeTruthy();
  })

  it('should if login call with email & password',()=>{
    emailControl?.setValue(user.email);
    passwordControl?.setValue(user.password);
    component.handleLogin();
    expect(component.loginForm.valid).toBeTruthy();
  })
  
  
  it('call login service with email & password',()=>{
    emailControl?.setValue(user.email);
    passwordControl?.setValue(user.password);
    component.handleLogin();
    expect(service.login).toHaveBeenCalled();
  })

  // it('call login service with email & password',()=>{
  //   emailControl?.setValue(user.email);
  //   passwordControl?.setValue(user.password);
  //   let button = fixture.debugElement.nativeElement.querySelector('#loginBtn');
  //   button.click();
  //   tick();
  //   expect(service.login).toHaveBeenCalled();
  // })

  // it('navigate to "dashboard" takes you to /dashboard', fakeAsync(() => {
  //   router.navigate(["/dashboard"]).then(() => {
  //     expect(location.path()).toBe("/dashboard");
  //   });
  // }));
});
