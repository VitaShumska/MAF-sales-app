import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadAddressDetailsComponent } from './contact-address-details.component';

describe('LeadAddressDetailsComponent', () => {
  let component: LeadAddressDetailsComponent;
  let fixture: ComponentFixture<LeadAddressDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadAddressDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadAddressDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
