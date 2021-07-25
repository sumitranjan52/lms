import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiosComponent } from './nios.component';

describe('NiosComponent', () => {
  let component: NiosComponent;
  let fixture: ComponentFixture<NiosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
