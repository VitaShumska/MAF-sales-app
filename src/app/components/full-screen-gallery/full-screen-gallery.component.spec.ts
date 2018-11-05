import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenGalleryComponent } from './full-screen-gallery.component';

describe('FullScreenGalleryComponent', () => {
  let component: FullScreenGalleryComponent;
  let fixture: ComponentFixture<FullScreenGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
