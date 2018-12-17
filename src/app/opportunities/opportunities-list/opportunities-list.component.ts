import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LeadsService } from '../../services/leads.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-opportunities-list',
  templateUrl: './opportunities-list.component.html',
  styleUrls: ['./opportunities-list.component.scss']
})
export class OpportunitiesListComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private leadsService: LeadsService,
    private router: Router,
    private breadcrumbs:  BreadcrumbsService,
    private loadingSpinner: LoadingSpinnerService,
    public snackBar: MatSnackBar) {}

  opportunitiesListOriginal: any[] = [];
  opportunitiesList;

  sortElem = {
    key: 'LeadNumber',
    sort: 'desc'
  };
  displayedColumns = [
    {
      name: 'Opportunity No.',
      key: 'OptyNumber',
      sort: '',
      disableSort: false
    },
    {
      name: 'Primary Purchaser',
      key: 'PrimaryContactPartyName',
      sort: '',
      disableSort: false
    },
    {
      name: 'Status Code',
      key: 'StatusCode',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit/Type',
      key: 'UnitType_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit No.',
      key: 'UnitNumber_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Created Date',
      key: 'CreationDate',
      sort: '',
      disableSort: false
    },
    {
      name: 'Last Update',
      key: 'LastUpdateDate',
      sort: '',
      disableSort: false
    }
  ];

  pageEvent: PageEvent;
  offset = 0;
  limit = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  countOfOpportunities;
  searchColumns = [];

  breadcrumbObj = {
    name: 'Opportunities',
    backUrl: '\home',
    param: 0
  };

  ngOnInit() {
    this.getOpportunities(this.offset, this.limit);
    this.displayedColumns.map( item => {
      this.searchColumns.push(item.key);
    });
    // if (window.sessionStorage.getItem('filterParams') || window.sessionStorage.getItem('limit') || window.sessionStorage.getItem('offset')) {
    //   this.filterParams = JSON.parse(window.sessionStorage.getItem('filterParams'));
    //   window.sessionStorage.getItem('limit') ? this.limit = +window.sessionStorage.getItem('limit') : false;
    //   window.sessionStorage.getItem('offset') ? this.offset = +window.sessionStorage.getItem('offset') : false;
    //   this.getOpportunitiesWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    // } else {
    //   this.getOpportunities(this.offset, this.limit);
    // }
    this.breadcrumbsArr();
  }

  getOpportunities(offset, limit) {
    this.loadingSpinner.show();
    this.leadsService.getOpportunities(offset, limit)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.opportunitiesListOriginal =  data['items'];
          this.opportunitiesList = this.opportunitiesListOriginal;
          this.countOfOpportunities = data['totalResults'];
        },
        (error) => {
          this.loadingSpinner.hide();
          this.apiService.logOut();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  // sortByKey(sortElem) {
  //   this.sortElem = sortElem;
  //   this.displayedColumns.forEach(item => {
  //     if (sortElem.key === item.key) {
  //       if (sortElem.sort === 'asc') {
  //         sortElem.sort = 'desc';
  //       } else {
  //         sortElem.sort = 'asc';
  //       }
  //     } else {
  //       item.sort = '';
  //     }
  //   });
  // }

  goToPage(url) {
    this.router.navigate([url]);
    // this.filterParams ? window.sessionStorage.setItem('filterParams', JSON.stringify(this.filterParams)) : false;
    window.sessionStorage.setItem('limit', this.limit.toString());
    window.sessionStorage.setItem('offset', this.offset.toString());
  }

  changeSearch(data) {
    this.opportunitiesList = data;
  }


  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  paginator (event) {
    this.offset = event.pageIndex * event.pageSize;
    this.limit = event.pageSize;
    // if (this.filterParams || this.sortElem) {
    //   this.getLeadsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    // } else {
      this.getOpportunities(this.offset, this.limit);
    // }
  }

}
