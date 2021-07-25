import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StdDialogComponent } from './std-dialog.component';

describe('StdDialogComponent', () => {
  let component: StdDialogComponent;
  let fixture: ComponentFixture<StdDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StdDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
