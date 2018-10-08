import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import {LoadingSpinnerService} from '../../services/loading-spinner.service';
import { MatSnackBar } from '@angular/material';
import 'hammerjs';

@Component({
  selector: 'app-ptoperies-details',
  templateUrl: './properies-details.component.html',
  styleUrls: ['./properies-details.component.scss']
})
export class ProperiesDetailsComponent implements OnInit {
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

  breadcrumbObj = {
    name: 'Unit Details',
    url: '',
    param: 0 // because is a parent
  };

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
        previewCloseOnClick: true,
        arrowPrevIcon: 'fa fa-chevron-left',
        arrowNextIcon: 'fa fa-chevron-right',
        closeIcon: 'fa fa-times',
        zoomInIcon: 'fa fa-plus',
        zoomOutIcon: 'fa fa-minus',
        previewZoom: true,
        previewSwipe: true,
        imageSwipe: true
      },
      {
        breakpoint: 1400,
        width: '100%',
        height: '500px',
        imagePercent: 80,
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

    let images = this.cmsTypeData.images.image;
    this.galleryImages = [];
    images.map( item => {
      this.galleryImages.push({
        small: 'https://mafsalesapp.com/static/' + type + '/images/' + item,
        medium: 'https://mafsalesapp.com/static/' + type + '/images/' + item,
        big: 'https://mafsalesapp.com/static/' + type + '/images/' + item
      });
    });

    let floorplans = this.cmsTypeData.floorplans.floorplan;
    this.galleryFloorplanImages = [];
    if (typeof floorplans === 'string') {
      this.galleryFloorplanImages = [
        {
          small: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + floorplans,
          medium: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + floorplans,
          big: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + floorplans
        }
      ];
    } else {
      floorplans.map(item => {
        this.galleryFloorplanImages.push({
          small: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + item,
          medium: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + item,
          big: 'https://mafsalesapp.com/static/' + type + '/floorplans/' + item
        });
      });
    }

    let videos = this.cmsTypeData.videos.video;
    this.galleryVideos = [];
    if (typeof videos === 'string') {
      this.galleryVideos.push ('https://mafsalesapp.com/static/' + type + '/videos/' + videos);
    } else {
      videos.map(item => {
        this.galleryVideos.push ('https://mafsalesapp.com/static/' + type + '/videos/' + item);
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
        this.openSnackBar('Server error', 'OK');
      });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
