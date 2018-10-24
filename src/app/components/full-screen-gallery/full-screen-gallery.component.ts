import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';


@Component({
  selector: 'app-full-screen-gallery',
  templateUrl: './full-screen-gallery.component.html',
  styleUrls: ['./full-screen-gallery.component.scss']
})
export class FullScreenGalleryComponent implements OnInit {
  @ViewChild('photoSwipe') photoSwipe: ElementRef;
  @Input() imagesArr;
  images;

  constructor() { }

  ngOnInit() {
  }

  openGalleryOnCick(event) {
    console.log('event!!!!!!!!!!!!', event, this.imagesArr, this.photoSwipe);
    this.images = [];

    this.imagesArr.map(item => {
      this.images.push(
        {
          src: item.small,
          w: 1200,
          h: 800
        });
    });
    console.log(this.images);

    const options = {
      index: event.index
    };

    // Initializes and opens PhotoSwipe
    const gallery = new PhotoSwipe(this.photoSwipe.nativeElement, PhotoSwipeUI_Default, [], options);
    gallery.init();
  }
}
