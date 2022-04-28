import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HotelService } from 'src/app/_services/hotel.service';

import { HotelSettingsComponent } from './hotel-settings.component';

describe('HotelSettingsComponent', () => {
  let component: HotelSettingsComponent;
  let fixture: ComponentFixture<HotelSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelSettingsComponent ],
      imports:[HttpClientModule,RouterTestingModule],
      providers:[HttpClient,HotelService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
