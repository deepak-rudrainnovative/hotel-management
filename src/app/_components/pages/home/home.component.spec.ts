import { HttpClient, HttpClientModule, HttpResponse } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { from, Observable, of } from 'rxjs';
import { HotelService } from 'src/app/_services/hotel.service';
import { UserService } from 'src/app/_services/user.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let service:HotelService;
  let hotels=of(new HttpResponse({body:[{_id:1,name:'taj'}]}));
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[HttpClientModule,RouterTestingModule],
      declarations: [ HomeComponent ],
      providers:[UserService,HotelService,LoadingBarService,HttpClient]
    })
    .compileComponents();
    
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    service=TestBed.get(HotelService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  xit('should return hotels',()=>{
    spyOn(service,'getAllHotels').and.returnValue(hotels);
    fixture.detectChanges();
    expect(component?.hotels.length).toBeGreaterThan(0)
  })
});
