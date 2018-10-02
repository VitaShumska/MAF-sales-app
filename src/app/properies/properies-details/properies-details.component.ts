import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
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
  i = 0;

  breadcrumbObj = {
    name: 'Unit Details',
    url: '',
    param: 0 // because is a parent
  };

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private apiService: ApiService) { }

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
        height: '600px',
        thumbnails: false,
        // thumbnailsColumns: 4,
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
      // max-width 800
      {
        breakpoint: 1400,
        width: '100%',
        height: '400px',
        imagePercent: 80,
        previewSwipe: true
        // thumbnailsPercent: 20,
        // thumbnailsMargin: 20,
        // thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    this.galleryImages = [
      {
        small: 'assets/images/unit-img.png',
        medium: 'assets/images/unit-img.png',
        big: 'assets/images/unit-img.png'
      },
      {
        small: 'assets/images/unit-img.png',
        medium: 'assets/images/unit-img.png',
        big: 'assets/images/unit-img.png'
      },
      {
        small: 'assets/images/unit-img.png',
        medium: 'assets/images/unit-img.png',
        big: 'assets/images/unit-img.png'
      }
    ];

    this.galleryFloorplanImages = [
      {
        small: 'assets/images/floorplan.jpg',
        medium: 'assets/images/floorplan.jpg',
        big: 'assets/images/floorplan.jpg'
      },
      {
        small: 'assets/images/floorplan.jpg',
        medium: 'assets/images/floorplan.jpg',
        big: 'assets/images/floorplan.jpg'
      },
      {
        small: 'assets/images/floorplan.jpg',
        medium: 'assets/images/floorplan.jpg',
        big: 'assets/images/floorplan.jpg'
      }
    ];

    this.galleryVideos = ['assets/images/video.mp4', 'assets/images/video1.mp4', 'assets/images/video.mp4']
  }

  getPropertiesById () {
    this.apiService.getPropertiesById(this.unitId)
      .subscribe(data => {
        this.unitDetails = data;
      });
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

}
