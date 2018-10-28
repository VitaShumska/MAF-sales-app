import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { PageEvent } from '@angular/material';


@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private breadcrumbs:  BreadcrumbsService,
    private loadingSpinner: LoadingSpinnerService,
    public snackBar: MatSnackBar) {}

  propertiesListOriginal;
  propertiesList;
  filterParams;
  pageEvent: PageEvent;
  offset = 0;
  limit = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  countOfProperties;
  countOfAllProperties;
  countOfAvailable = 0;
  searchColumns = [];
  sortElem = 'MAF_UnitNumber_c';

  displayedColumns = [
    {
      name: 'Unit Type',
      key: 'MAF_UnitType_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Phase',
      key: 'MAF_PhaseName_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Product',
      key: 'MAF_UnitModel_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Product #',
      key: 'MAF_UnitNumber_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Plot Area',
      key: 'MAF_PlotAreaSqFt_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Built-up Area',
      key: 'MAF_BuiltupAreaSqFt_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Status',
      key: 'MAF_Status_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit price',
      key: 'MAF_UnitPrice_c',
      sort: '',
      disableSort: false
    }
  ];

  breadcrumbObj = {
    name: 'Units',
    url: '',
    param: 0
  };

  ngOnInit() {
    this.displayedColumns.map( item => {
      this.searchColumns.push(item.key);
    });
    this.getCountOfAllProperties();
    if (window.sessionStorage.getItem('filterParams')) {
      this.filterParams = JSON.parse(window.sessionStorage.getItem('filterParams'));
      this.getPropertiesWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getProperties(this.offset, this.limit);
    }
    this.breadcrumbsArr();
  }

  getProperties(offset, limit) {
    this.loadingSpinner.show();
    // this.clearSearchInput();
    this.apiService.getProperties(offset, limit)
      .subscribe(
        (data:  Array<object>) => {
          this.loadingSpinner.hide();
          this.countOfProperties = data['totalResults'];
          this.propertiesListOriginal  =  data;
          this.propertiesListOriginal  =  this.propertiesListOriginal.items;
          this.propertiesList = this.propertiesListOriginal;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getPropertiesWithFilter(offset, limit, sortParam?, filterParams?) {
    this.loadingSpinner.show();
    // this.clearSearchInput();
    this.apiService.getPropertiesWithFilter(offset, limit, sortParam, filterParams).subscribe(
      (data:  Array<object>) => {
        this.loadingSpinner.hide();
        this.propertiesListOriginal = data;
        this.countOfProperties = data['totalResults'];
        this.propertiesListOriginal = this.propertiesListOriginal.items;
        this.propertiesList = this.propertiesListOriginal;
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      }
    );
  }

  getCountOfAvailable () {
    this.loadingSpinner.show();
    let filterParams;
    if ( this.filterParams ) {
      filterParams = Object.assign({}, this.filterParams);
      filterParams.status = 'available';
    } else {
      filterParams = {
        status: 'available'
      };
    }
    this.apiService.getPropertiesWithFilter(0, this.limit, this.sortElem, filterParams)
      .subscribe((data:  Array<object>) => {
        this.loadingSpinner.hide();
        this.countOfAvailable = data['totalResults'];
      });
  }

  getCountOfAllProperties(){
    this.loadingSpinner.show();
    this.apiService.getAllProperties()
      .subscribe((data:  Array<object>) => {
        this.loadingSpinner.hide();
        this.countOfAllProperties = data['totalResults'];
      });
  }

  sortByKey(sortElem) {
    // this.clearSearchInput();
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
    this.getPropertiesWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
  }

  clearSearchInput() {
    const searchInput = document.getElementById('searchInput');
    searchInput['value'] = '';
  }

  goToPage(url) {
    this.router.navigate([url]);
    this.filterParams ? window.sessionStorage.setItem('filterParams', JSON.stringify(this.filterParams)): false;
  }

  changeSearch(data) {
    this.propertiesList = data;
  }

  changeFilter(data) {
    this.propertiesList = data.items;
    this.countOfProperties = data.totalResults;
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
      this.getPropertiesWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getProperties(this.offset, this.limit);
    }
  }
}
