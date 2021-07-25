import { TestBed } from '@angular/core/testing';

import { SubjectFeepaymentService } from './subject-feepayment.service';

describe('SubjectFeepaymentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SubjectFeepaymentService = TestBed.get(SubjectFeepaymentService);
    expect(service).toBeTruthy();
  });
});
