import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectAddDialogComponent } from './subject-add-dialog.component';

describe('SubjectAddDialogComponent', () => {
  let component: SubjectAddDialogComponent;
  let fixture: ComponentFixture<SubjectAddDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectAddDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectAddDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
