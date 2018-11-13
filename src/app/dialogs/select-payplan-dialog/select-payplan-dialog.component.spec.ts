import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectPayplanDialogComponent } from './select-payplan-dialog.component';

describe('SelectPayplanDialogComponent', () => {
  let component: SelectPayplanDialogComponent;
  let fixture: ComponentFixture<SelectPayplanDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectPayplanDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectPayplanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
