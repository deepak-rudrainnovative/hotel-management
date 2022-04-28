import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelSettingsComponent } from './hotel-settings.component';

describe('HotelSettingsComponent', () => {
  let component: HotelSettingsComponent;
  let fixture: ComponentFixture<HotelSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HotelSettingsComponent ]
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
