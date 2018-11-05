import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PtoperiesDetailsComponent } from './properies-details.component';

describe('PtoperiesDetailsComponent', () => {
  let component: PtoperiesDetailsComponent;
  let fixture: ComponentFixture<PtoperiesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PtoperiesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PtoperiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
