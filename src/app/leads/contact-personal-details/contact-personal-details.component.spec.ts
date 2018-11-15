import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadPersonalDetailsComponent } from './contact-personal-details.component';

describe('LeadPersonalDetailsComponent', () => {
  let component: LeadPersonalDetailsComponent;
  let fixture: ComponentFixture<LeadPersonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadPersonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
