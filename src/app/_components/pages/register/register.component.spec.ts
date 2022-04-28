import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/_services/user.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let nameControl:any;
  let emailControl:any;
  let passwordControl:any;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule,HttpClientModule],
      declarations: [ RegisterComponent ],
      providers:[HttpClient,UserService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nameControl=component.registerForm.get('name');
    emailControl=component.registerForm.get('email');
    passwordControl=component.registerForm.get('password');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should form invalid if name,email & password empty',()=>{
    nameControl?.setValue('');
    emailControl?.setValue('');
    passwordControl?.setValue('');
    expect(nameControl?.invalid).toBeTruthy();
    expect(emailControl?.invalid).toBeTruthy();
    expect(passwordControl?.invalid).toBeTruthy();
  });

  it('should form valid if name ,email & password correct',()=>{
    nameControl?.setValue('Test Angular');
    emailControl?.setValue('testemail@abc.com');
    passwordControl?.setValue('Test@123');
    expect(nameControl?.value).toBe('Test Angular');
    expect(nameControl?.valid).toBeTruthy();
    expect(emailControl?.valid).toBeTruthy();
    expect(passwordControl?.valid).toBeTruthy();
  });
});
