import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize} from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import { PropertiesService } from '../../services/properties.service';
import { LeadsService } from '../../services/leads.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatSnackBar } from '@angular/material';
import PhotoSwipe from 'photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import { FullScreenGalleryComponent } from "../../components/full-screen-gallery/full-screen-gallery.component";

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
  unitContent;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  galleryFloorplanImages: NgxGalleryImage[];
  galleryVideos: any = [];
  cmsId;
  index;

  breadcrumbObj = {
    name: 'Unit Details',
    backUrl: '/units',
    param: 0 // because is a parent
  };
  images;

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private apiService: ApiService,
              private propertiesService: PropertiesService,
              private leadsService: LeadsService,
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
        height: 'calc(100vh - 220px)',
        thumbnails: false,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: true,
        previewCloseOnClick: true,
        previewZoom: true,
        previewSwipe: true,
        imageSwipe: true,
        imageSize: NgxGalleryImageSize.Cover,
        imagePercent: 100,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        closeIcon: 'fa fa-times',
        zoomInIcon: 'fa fa-plus',
        zoomOutIcon: 'fa fa-minus'
      },
      {
        breakpoint: 1400,
        width: '100%',
        height: 'calc(100vh - 265px)',
        imagePercent: 100,
        previewSwipe: true
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
  }

  onClick(event, type) {
    const options = {
      index: event.index
    };
    if (type === 'images') {
      this.images = [];

      this.galleryImages.map(item => {
        this.images.push(
          {
            src: item.small,
            w: 0,
            h: 0
          });
      });
      const galleryImages = new PhotoSwipe(this.photoSwipeImages.nativeElement, PhotoSwipeUI_Default, this.images, options);
      galleryImages.listen('gettingData', function(index, item) {
        if (item.w < 1 || item.h < 1) {
          let img = new Image();
          img.onload = function () {
            item.w = img.width;
            item.h = img.height;
            galleryImages.updateSize(true);
          };
          img.src = item.src;
        }
      });
      galleryImages.init();
    } else if (type === 'floorplan') {
      this.images = [];

      this.galleryFloorplanImages.map(item => {
        this.images.push(
          {
            src: item.small,
            w: 0,
            h: 0
          });
      });
      const galleryFloorplan = new PhotoSwipe(this.photoSwipeFloorplan.nativeElement, PhotoSwipeUI_Default, this.images, options);
      galleryFloorplan.listen('gettingData', function(index, item) {
        if (item.w < 1 || item.h < 1) {
          let img = new Image();
          img.onload = function () {
            item.w = img.width;
            item.h = img.height;
            galleryFloorplan.updateSize(true);
          };
          img.src = item.src;
        }
      });
      galleryFloorplan.init();
    }
  }

  getPropertiesById () {
    this.loadingSpinner.show();
    this.apiService.getPropertiesById(this.unitId)
      .subscribe(data => {
        this.loadingSpinner.hide();
        this.unitDetails = data;
        this.cmsId = this.unitDetails['MAF_UnitType_c'];
          this.getPropertiesContent(this.cmsId);
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getPropertiesContent(type) {
    this.loadingSpinner.show();
    this.propertiesService.getPropertiesContent(type)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.unitContent = data;
          this.getGalleryOption();
          console.log('unitContent', this.unitContent);
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      });
  }

  createNewOpportunity() {
    const contactName = this.leadsService.contactName;
    const keyContactId = this.leadsService.keyContactId;
    this.leadsService.createOpportunity(contactName, keyContactId, this.unitDetails.MAF_UnitNumber_c);
    this.openSnackBar('Opportunity created.', 'OK');
    this.router.navigate(['/opportunities']);
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

  getGalleryOption () {
    ////////get url for videos///////////////
    const videos = this.unitContent.videos;
    if (videos.length > 0) {
      this.galleryVideos = [];
      videos.map(item => {
        this.galleryVideos.push(item);
      });
    }

    ////////get url for images///////////////
    const images = this.unitContent.images;
    if (images.length > 0) {
      this.galleryImages = [];
      images.map(item => {
        this.galleryImages.push({
          small: item.image,
          medium: item.image,
          big: item.image
        });
      });
    }

    ////////get url for floorplans////////////
    const floorplans = this.unitContent.floorplans;
    if (floorplans.length > 0) {
      this.galleryFloorplanImages = [];
      floorplans.map(item => {
        this.galleryFloorplanImages.push({
          small: item.image,
          medium: item.image,
          big: item.image
        });
      });
    }
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
