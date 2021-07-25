import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateDialogComponent } from './state-dialog.component';

describe('StateDialogComponent', () => {
  let component: StateDialogComponent;
  let fixture: ComponentFixture<StateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
