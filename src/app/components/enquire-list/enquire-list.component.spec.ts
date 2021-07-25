import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnquireListComponent } from './enquire-list.component';

describe('EnquireListComponent', () => {
  let component: EnquireListComponent;
  let fixture: ComponentFixture<EnquireListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnquireListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnquireListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
