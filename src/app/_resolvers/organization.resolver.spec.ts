import { TestBed } from '@angular/core/testing';

import { OrganizationResolver } from './organization.resolver';

describe('OrganizationResolver', () => {
  let resolver: OrganizationResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(OrganizationResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
