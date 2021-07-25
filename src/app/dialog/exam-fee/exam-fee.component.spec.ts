import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExamFeeComponent } from './exam-fee.component';

describe('ExamFeeComponent', () => {
  let component: ExamFeeComponent;
  let fixture: ComponentFixture<ExamFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExamFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExamFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
