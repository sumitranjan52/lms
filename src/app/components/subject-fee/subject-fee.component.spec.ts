import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFeeComponent } from './subject-fee.component';

describe('SubjectFeeComponent', () => {
  let component: SubjectFeeComponent;
  let fixture: ComponentFixture<SubjectFeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectFeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
