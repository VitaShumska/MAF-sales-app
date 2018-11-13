import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadIdentificationComponent } from './lead-identification.component';

describe('LeadIdentificationComponent', () => {
  let component: LeadIdentificationComponent;
  let fixture: ComponentFixture<LeadIdentificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadIdentificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadIdentificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
