import { TestBed } from '@angular/core/testing';

import { NiosGroupService } from './nios-group.service';

describe('NiosGroupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NiosGroupService = TestBed.get(NiosGroupService);
    expect(service).toBeTruthy();
  });
});
