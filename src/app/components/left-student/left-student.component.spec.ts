import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeftStudentComponent } from './left-student.component';

describe('LeftStudentComponent', () => {
  let component: LeftStudentComponent;
  let fixture: ComponentFixture<LeftStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeftStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeftStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
