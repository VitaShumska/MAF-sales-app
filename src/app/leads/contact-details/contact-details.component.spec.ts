import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDetailsComponent } from './contact-details.component';

describe('LeadDetailsComponent', () => {
  let component: LeadDetailsComponent;
  let fixture: ComponentFixture<LeadDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
