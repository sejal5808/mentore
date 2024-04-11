import { TestBed } from '@angular/core/testing';

import { ServicetestService } from './servicetest.service';

describe('ServicetestService', () => {
  let service: ServicetestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicetestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
