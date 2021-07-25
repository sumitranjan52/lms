import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiosHomeComponent } from './nios-home.component';

describe('NiosHomeComponent', () => {
  let component: NiosHomeComponent;
  let fixture: ComponentFixture<NiosHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiosHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
