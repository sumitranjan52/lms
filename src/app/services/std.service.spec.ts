import { TestBed } from '@angular/core/testing';

import { StdService } from './std.service';

describe('StdService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StdService = TestBed.get(StdService);
    expect(service).toBeTruthy();
  });
});
