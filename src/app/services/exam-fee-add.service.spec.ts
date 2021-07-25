import { TestBed } from '@angular/core/testing';

import { ExamFeeAddService } from './exam-fee-add.service';

describe('ExamFeeAddService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExamFeeAddService = TestBed.get(ExamFeeAddService);
    expect(service).toBeTruthy();
  });
});
