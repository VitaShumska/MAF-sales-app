import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize} from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatSnackBar } from '@angular/material';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { FullScreenGalleryComponent } from "../../components/full-screen-gallery/full-screen-gallery.component";

// import 'hammerjs';

@Component({
  selector: 'app-ptoperies-details',
  templateUrl: './properies-details.component.html',
  styleUrls: ['./properies-details.component.scss']
})
export class ProperiesDetailsComponent implements OnInit {
  @ViewChild('photoSwipeImages') photoSwipeImages: ElementRef;
  @ViewChild('photoSwipeFloorplan') photoSwipeFloorplan: ElementRef;
  @ViewChild(FullScreenGalleryComponent) fullScreenGallery: FullScreenGalleryComponent ;

  sub;
  unitId;
  unitDetails;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryFloorplanImages: NgxGalleryImage[];
  galleryVideos: any = [];
  cmsId;
  cmsData;
  cmsTypeData;
  index;

  breadcrumbObj = {
    name: 'Unit Details',
    url: '',
    param: 0 // because is a parent
  };
  images;

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private apiService: ApiService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.unitId = params['unitId'];
      if (this.unitId) {
        this.getPropertiesById();
      } else {
      }
    });
    this.breadcrumbsArr();

    this.galleryOptions = [
      {
        width: '100%',
        height: '700px',
        thumbnails: false,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewCloseOnClick: true,
        previewZoom: true,
        previewSwipe: true,
        imageSwipe: true,
        imageSize: NgxGalleryImageSize.Cover,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        closeIcon: 'fa fa-times',
        zoomInIcon: 'fa fa-plus',
        zoomOutIcon: 'fa fa-minus'
      },
      {
        breakpoint: 1400,
        width: '100%',
        height: 'calc(100vh - 320px)',
        imagePercent: 100,
        previewSwipe: true
      },
      {
        breakpoint: 800,
        width: '100%',
        height: '300px',
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/image-overlay.png',
        medium: 'assets/images/image-overlay.png',
        big: 'assets/images/image-overlay.png'
      }
    ];

    this.galleryFloorplanImages = [
      {
        small: 'assets/images/image-overlay.png',
        medium: 'assets/images/image-overlay.png',
        big: 'assets/images/image-overlay.png'
      }
    ];

    this.galleryVideos = ['assets/images/image-overlay.png'];


   //Initializes and opens PhotoSwipe
   //    this.gallery = new PhotoSwipe( this.photoSwipe.nativeElement, PhotoSwipeUI_Default, this.items, this.options);
   //    this.gallery.init();
  }

  onClick(event, type) {

    // this.fullScreenGallery.openGalleryOnCick(event);

    const options = {
      index: event.index
    };
    if (type === 'images') {
      this.images = [];

      this.galleryImages.map(item => {
        this.images.push(
          {
            src: item.small,
            w: 1200,
            h: 800
          });
      });
      const galleryImages = new PhotoSwipe(this.photoSwipeImages.nativeElement, PhotoSwipeUI_Default, this.images, options);
      galleryImages.init();
    } else if (type === 'floorplan') {
      this.images = [];

      this.galleryFloorplanImages.map(item => {
        this.images.push(
          {
            src: item.small,
            w: 1200,
            h: 800
          });
      });
      const galleryFloorplan = new PhotoSwipe(this.photoSwipeFloorplan.nativeElement, PhotoSwipeUI_Default, this.images, options);
      galleryFloorplan.init();
    }
  }

  getPropertiesById () {
    this.loadingSpinner.show();
    this.apiService.getPropertiesById(this.unitId)
      .subscribe(data => {
        this.loadingSpinner.hide();
        this.unitDetails = data;
        this.cmsId = this.unitDetails['MAF_CMSID_c'];
        this.getXml();
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      });
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

  getGalleryOption () {
    let type;
    if (this.cmsId === '12345') {
      type = 't1';
      this.cmsTypeData = this.cmsData[type];
    } else {
      type = 't2';
      this.cmsTypeData = this.cmsData[type];
    }

    ////////get url for videos////////////
    const videos = this.cmsTypeData.videos.video;
    if (typeof videos === 'string') {
      this.galleryVideos = [];
      this.galleryVideos.push('https://mafsalesapp.com/static/' + type + '/videos/' + videos);
    } else if (videos === undefined) {
      return;
    } else {
      this.galleryVideos = [];
      videos.map(item => {
        this.galleryVideos.push('https://mafsalesapp.com/static/' + type + '/videos/' + item);
      });
    }

    ////////get url for images///////////////
    const images = this.cmsTypeData.images.image;
    if (typeof images === 'string') {
      this.galleryImages = [
        {
          small: 'https://mafsalesapp.com/static/' + type + '/images/' + images,
          medium: 'https://mafsalesapp.com/static/' + type + '/images/' + images,
          big: 'https://mafsalesapp.com/static/' + type + '/images/' + images
        }
      ];
    } else if (images === undefined) {
      return;
    } else {
      this.galleryImages = [];
      images.map(item => {
        this.galleryImages.push({
          small: 'https://mafsalesapp.com/static/' + type + '/images/' + item,
          medium: 'https://mafsalesapp.com/static/' + type + '/images/' + item,
          big: 'https://mafsalesapp.com/static/' + type + '/images/' + item
        });
      });
    }

    ////////get url for floorplans////////////
    const floorplans = this.cmsTypeData.floorplans.floorplan;
    if (typeof floorplans === 'string') {
      this.galleryFloorplanImages = [
        {
          small: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + floorplans,
          medium: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + floorplans,
          big: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + floorplans
        }
      ];
    } else if (floorplans === undefined) {
      return;
    } else {
      this.galleryFloorplanImages = [];
      floorplans.map(item => {
        this.galleryFloorplanImages.push({
          small: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + item,
          medium: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + item,
          big: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + item
        });
      });
    }
  }

  getXml() {
    this.loadingSpinner.show();
    this.apiService.getXml()
      .subscribe(xmlData => {
          this.loadingSpinner.hide();
        this.cmsData = xmlData['CMS']['Types'];
        this.getGalleryOption ();
      },
      (error) => {
        this.loadingSpinner.hide();
        // this.openSnackBar('Server error', 'OK');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
