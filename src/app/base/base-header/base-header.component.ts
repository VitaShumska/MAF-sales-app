import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { FilterCloseService } from '../../services/filter-close.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss']
})
export class BaseHeaderComponent implements OnInit {

  href: string;
  breadcrumbsArr = [];
  headerName: string;

  constructor(
    private location: Location,
    private router: Router,
    private breadcrumbs: BreadcrumbsService,
    private filterClose: FilterCloseService
  ) {
    this.breadcrumbs.breadcrumbsEmitter
      .subscribe( breadcrumbsArr => {
        this.breadcrumbsArr = breadcrumbsArr;
        this.headerName = this.breadcrumbsArr[0].name;
      });
  }

  ngOnInit() {
    this.href = this.router.url;
  }

  goBack(): void {
    if ( document.getElementById('light') && document.getElementById('fade') ) {
      this.filterClose.closeFilter(false);
    }
    if (this.headerName === 'Home' || this.headerName === 'Units') {
      window.location.href = 'https://ebrl-test.fa.em2.oraclecloud.com';
    } else if (this.headerName === 'Unit Details') {
      this.router.navigate(['/units']);
    } else {
      this.location.back();
    }
  }
}
