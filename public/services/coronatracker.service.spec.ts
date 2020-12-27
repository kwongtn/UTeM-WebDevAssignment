import { TestBed } from '@angular/core/testing';

import { CoronatrackerService } from './coronatracker.service';

describe('CoronatrackerService', () => {
  let service: CoronatrackerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoronatrackerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
