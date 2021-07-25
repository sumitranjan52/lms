import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DistrictDialogComponent } from './district-dialog.component';

describe('DistrictDialogComponent', () => {
  let component: DistrictDialogComponent;
  let fixture: ComponentFixture<DistrictDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DistrictDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DistrictDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
