import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { FilterCloseService } from '../../services/filter-close.service';
import { LeadsService } from '../../services/leads.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss']
})
export class BaseHeaderComponent implements OnInit {

  href: string;
  breadcrumbsArr = [];
  headerName: string;
  backUrl: string;

  constructor(
    private location: Location,
    private router: Router,
    private breadcrumbs: BreadcrumbsService,
    private filterClose: FilterCloseService,
    private leadsService: LeadsService,
    private apiService: ApiService
  ) {
    this.breadcrumbs.breadcrumbsEmitter
      .subscribe( breadcrumbsArr => {
        this.breadcrumbsArr = breadcrumbsArr;
        this.headerName = this.breadcrumbsArr[0].name;
        this.backUrl = this.breadcrumbsArr[0].backUrl;
      });
  }

  ngOnInit() {
    this.href = this.router.url;
  }

  goToPage(url) {
     this.router.navigate([url]);
  }

  logOut() {
    this.apiService.logOut();
    this.router.navigate(['/login']);
  }

  isLogin() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  goBack(): void {
    if ( document.getElementById('light') && document.getElementById('fade') ) {
      this.filterClose.closeFilter(false);
    }

    switch (this.headerName) {
      case '': {
        window.location.href = 'https://ebrl-test.fa.em2.oraclecloud.com';
        break;
      }
      case 'Home': {
        window.location.href = 'https://ebrl-test.fa.em2.oraclecloud.com';
        break;
      }
      case 'Units': {
        this.leadsService.opportunityData.backUrl ? this.router.navigate([this.leadsService.opportunityData.backUrl]) : this.router.navigate([this.backUrl]);
        break;
      }
      case 'Unit Details': {
        this.leadsService.opportunityData.backUrl ? this.router.navigate([this.leadsService.opportunityData.backUrl]) : this.router.navigate([this.backUrl]);
        break;
      }
      default: {
        this.router.navigate([this.backUrl]);
        break;
      }
    }
  }
}
