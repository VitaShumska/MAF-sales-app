import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadArabicDetailsComponent } from './lead-arabic-details.component';

describe('LeadArabicDetailsComponent', () => {
  let component: LeadArabicDetailsComponent;
  let fixture: ComponentFixture<LeadArabicDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadArabicDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadArabicDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
