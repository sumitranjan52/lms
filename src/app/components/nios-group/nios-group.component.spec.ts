import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NiosGroupComponent } from './nios-group.component';

describe('NiosGroupComponent', () => {
  let component: NiosGroupComponent;
  let fixture: ComponentFixture<NiosGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NiosGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NiosGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
