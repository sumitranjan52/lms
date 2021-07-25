import { TestBed } from '@angular/core/testing';

import { AdmissionService } from './admission.service';

describe('AdmissionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AdmissionService = TestBed.get(AdmissionService);
    expect(service).toBeTruthy();
  });
});
