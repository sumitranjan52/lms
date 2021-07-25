import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediumDialogComponent } from './medium-dialog.component';

describe('MediumDialogComponent', () => {
  let component: MediumDialogComponent;
  let fixture: ComponentFixture<MediumDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediumDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediumDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
