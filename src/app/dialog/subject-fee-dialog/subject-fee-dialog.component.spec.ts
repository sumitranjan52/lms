import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectFeeDialogComponent } from './subject-fee-dialog.component';

describe('SubjectFeeDialogComponent', () => {
  let component: SubjectFeeDialogComponent;
  let fixture: ComponentFixture<SubjectFeeDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectFeeDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectFeeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
