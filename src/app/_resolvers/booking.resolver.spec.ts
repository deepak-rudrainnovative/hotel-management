import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { BookingResolver } from './booking.resolver';

describe('BookingResolver', () => {
  let resolver: BookingResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientModule],
      providers:[
        HttpClient
      ]
    });
    resolver = TestBed.inject(BookingResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
