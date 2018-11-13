import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss']
})
export class LeadsListComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private breadcrumbs:  BreadcrumbsService,
    private loadingSpinner: LoadingSpinnerService,
    public snackBar: MatSnackBar) {}

  leadsListOriginal: any[] = [];
  leadsList;
  filterParams;
  pageEvent: PageEvent;
  offset = 0;
  limit = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  countOfLeads;
  searchColumns = [];
  sortElem;
  // sortElem = {
  //   key: '',
  //   sort: ''
  // };
  displayedColumns = [
    {
      name: 'Lead Number',
      key: 'LeadNumber',
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
      name: 'Secondary Purchaser',
      key: 'OwnerPartyName',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit/Type',
      key: 'MAF_Project_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit Number',
      key: 'MAF_ProductType_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Last Updater',
      key: 'LastUpdateDate',
      sort: '',
      disableSort: false
    }
  ];

  breadcrumbObj = {
    name: 'Leads',
    backUrl: '\home',
    param: 0
  };

  ngOnInit() {
    this.displayedColumns.map( item => {
      this.searchColumns.push(item.key);
    });
    if (window.sessionStorage.getItem('filterParams') || window.sessionStorage.getItem('limit') || window.sessionStorage.getItem('offset')) {
      this.filterParams = JSON.parse(window.sessionStorage.getItem('filterParams'));
      window.sessionStorage.getItem('limit') ? this.limit = +window.sessionStorage.getItem('limit') : false;
      window.sessionStorage.getItem('offset') ? this.offset = +window.sessionStorage.getItem('offset') : false;
      this.getContactsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getContacts(this.offset, this.limit);
    }
    this.breadcrumbsArr();
  }

  getContacts(offset, limit) {
    this.loadingSpinner.show();
    this.apiService.getContacts(offset, limit)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.countOfLeads = data['totalResults'];
          this.leadsListOriginal  =  data['items'];
          this.leadsList = this.leadsListOriginal;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getContactsWithFilter(offset, limit, sortParam?, filterParams?) {
    this.loadingSpinner.show();
    this.apiService.getContactsWithFilter(offset, limit, sortParam, filterParams).subscribe(
      (data:  any) => {
        this.loadingSpinner.hide();
        this.leadsListOriginal = data['items'];
        this.countOfLeads = data['totalResults'];
        this.leadsList = this.leadsListOriginal;
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      }
    );
  }

  sortByKey(sortElem) {
    this.sortElem = sortElem;
    this.displayedColumns.forEach(item => {
      if (sortElem.key === item.key) {
        if (sortElem.sort === 'asc') {
          sortElem.sort = 'desc';
        } else {
          sortElem.sort = 'asc';
        }
      } else {
        item.sort = '';
      }
    });
    this.getContactsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
  }

  goToPage(url) {
    this.router.navigate([url]);
    this.filterParams ? window.sessionStorage.setItem('filterParams', JSON.stringify(this.filterParams)) : false;
    window.sessionStorage.setItem('limit', this.limit.toString());
    window.sessionStorage.setItem('offset', this.offset.toString());
  }

  changeSearch(data) {
    this.leadsList = data;
  }

  changeFilter(data) {
    this.leadsListOriginal = data.items;
    this.leadsList = this.leadsListOriginal;
    this.countOfLeads = data.totalResults;
  }

  changeFilterParams(data) {
    this.filterParams = data;
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
    if (this.filterParams || this.sortElem) {
      this.getContactsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getContacts(this.offset, this.limit);
    }
  }

}
