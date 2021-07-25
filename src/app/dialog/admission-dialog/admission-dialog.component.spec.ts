import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmissionDialogComponent } from './admission-dialog.component';

describe('AdmissionDialogComponent', () => {
  let component: AdmissionDialogComponent;
  let fixture: ComponentFixture<AdmissionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdmissionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdmissionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
