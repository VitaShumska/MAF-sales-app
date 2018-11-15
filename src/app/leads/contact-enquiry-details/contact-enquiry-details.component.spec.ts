import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadEnquiryDetailsComponent } from './contact-enquiry-details.component';

describe('LeadEnquiryDetailsComponent', () => {
  let component: LeadEnquiryDetailsComponent;
  let fixture: ComponentFixture<LeadEnquiryDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadEnquiryDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadEnquiryDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
