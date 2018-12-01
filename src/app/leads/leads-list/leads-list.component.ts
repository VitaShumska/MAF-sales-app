import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LeadsService } from '../../services/leads.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { MatDialog, MatSnackBar } from '@angular/material';
import { PageEvent } from '@angular/material';
import { InfoDialogComponent } from "../../dialogs/info-dialog/info-dialog.component";

@Component({
  selector: 'app-leads-list',
  templateUrl: './leads-list.component.html',
  styleUrls: ['./leads-list.component.scss']
})
export class LeadsListComponent implements OnInit {

  constructor(
    private apiService: ApiService,
    private leadsService: LeadsService,
    private router: Router,
    private breadcrumbs:  BreadcrumbsService,
    private loadingSpinner: LoadingSpinnerService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {}

  leadsListOriginal: any[] = [];
  leadsList;
  filterParams;
  pageEvent: PageEvent;
  offset = 0;
  limit = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  countOfLeads;
  searchColumns = [];
  sortElem = {
    key: 'LeadNumber',
    sort: 'desc'
  };
  displayedColumns = [
    {
      name: 'Lead No.',
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
      name: 'Lead Owner',
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
      name: 'Unit No.',
      key: 'MAF_ProductType_c',
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
      this.getLeadsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getLeads(this.offset, this.limit);
    }
    this.breadcrumbsArr();
  }

  getLeads(offset, limit) {
    this.loadingSpinner.show();
    this.leadsService.getLeads(offset, limit)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.countOfLeads = data['totalResults'];
          this.leadsListOriginal  =  data['items'];
          this.leadsList = this.leadsListOriginal;
          console.log('contacts', data);
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getLeadsWithFilter(offset, limit, sortParam?, filterParams?) {
    this.loadingSpinner.show();
    this.leadsService.getLeadsWithFilter(offset, limit, sortParam, filterParams).subscribe(
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
    this.getLeadsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
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

  openInfoDialog(text,type): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '60vw',
      data: {
        text: text,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
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
      this.getLeadsWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getLeads(this.offset, this.limit);
    }
  }

}
