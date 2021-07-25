import { TestBed } from '@angular/core/testing';

import { EnquireService } from './enquire.service';

describe('EnquireService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnquireService = TestBed.get(EnquireService);
    expect(service).toBeTruthy();
  });
});
