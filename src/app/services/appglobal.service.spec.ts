import { TestBed } from '@angular/core/testing';

import { AppglobalService } from './appglobal.service';

describe('AppglobalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AppglobalService = TestBed.get(AppglobalService);
    expect(service).toBeTruthy();
  });
});
