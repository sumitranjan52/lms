import { TestBed } from '@angular/core/testing';

import { SubjectFeeService } from './subject-fee.service';

describe('SubjectFeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectFeeService = TestBed.get(SubjectFeeService);
    expect(service).toBeTruthy();
  });
});
