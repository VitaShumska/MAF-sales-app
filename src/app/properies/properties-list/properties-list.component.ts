import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiService } from '../../services/api.service';
import {PropertiesService} from "../../services/properties.service";
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
    private propertiesService: PropertiesService,
    private breadcrumbs:  BreadcrumbsService,
    private loadingSpinner: LoadingSpinnerService,
    public snackBar: MatSnackBar) {}

  propertiesListOriginal: any[] = [];
  propertiesList;
  propertiesListContent: any = {};
  filterParams;
  pageEvent: PageEvent;
  offset = 0;
  limit = 25;
  pageSizeOptions: number[] = [25, 50, 100];
  countOfProperties;
  countOfAvailable = 0;
  searchColumns = [];
  sortElem = {
    key: 'MAF_UnitNumber_c',
    sort: 'desc'
  };;

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
      name: 'Product No.',
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
    if (window.sessionStorage.getItem('filterParams') || window.sessionStorage.getItem('limit') || window.sessionStorage.getItem('offset')) {
      this.filterParams = JSON.parse(window.sessionStorage.getItem('filterParams'));
      window.sessionStorage.getItem('limit') ? this.limit = +window.sessionStorage.getItem('limit') : false;
      window.sessionStorage.getItem('offset') ? this.offset = +window.sessionStorage.getItem('offset') : false;
      this.getPropertiesWithFilter(this.offset, this.limit, this.sortElem, this.filterParams);
    } else {
      this.getProperties(this.offset, this.limit);
    }
    this.breadcrumbsArr();
    this.getPropertiesContentList();
  }

  getProperties(offset, limit) {
    this.loadingSpinner.show();
    // this.clearSearchInput();
    this.apiService.getProperties(offset, limit)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.countOfProperties = data['totalResults'];
          this.propertiesListOriginal  =  data['items'];
          this.propertiesList = this.propertiesListOriginal;
          this.countOfAvailable = this.countOfProperties;
          this.countOfAvailable = this.countOfProperties;
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
      (data:  any) => {;
        this.loadingSpinner.hide();
        this.propertiesListOriginal = data['items'];
        this.countOfProperties = data['totalResults'];
        this.propertiesList = this.propertiesListOriginal;
        this.countOfAvailable = this.countOfProperties;
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      }
    );
  }

  getPropertiesContentList() {
    this.loadingSpinner.show();
    this.propertiesService.getPropertiesContentList().subscribe(
      (data:  any) => {
        this.loadingSpinner.hide();
        this.propertiesListContent = data;
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      }
    );
  }

  getTitleImage(type) {
    const index = this.propertiesListContent.map(item => item.type).indexOf(type);
    if (index !== -1) {
      if (this.propertiesListContent[index].image_preview === null) {
        return 'assets/images/image-overlay.png';
      } else {
        return this.propertiesListContent[index].image_preview;
      }
    } else {
      return 'assets/images/image-overlay.png';
    }
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

  parseFolderName(name) {
    const allTypes = ['1BED-T1', '1BED-T2', '1BED-T3', '2BED-T1', '2BED-T3', '2BED-T4', '4B BGL', '4B LV', '5B BGL', '5B LV', '5B TYP', '6B LV', '6B ULV', 'STD-T1A'];
    if ( allTypes.indexOf(name) === -1 ) {
      return '2';
    }
    return name.replace(/\s/g, '_');
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
    window.sessionStorage.setItem('limit', this.limit.toString());
    window.sessionStorage.setItem('offset', this.offset.toString());

  }

  changeSearch(data) {
    this.propertiesList = data;
    ///get count of available/////////
    const searchInput = localStorage.getItem('searchText');
    if ( searchInput === 'null') {
      this.countOfAvailable = this.countOfProperties;
    } else if (searchInput === '') {
      this.countOfAvailable = this.countOfProperties;
    } else {
      this.countOfAvailable = this.propertiesList.length;
    }
  }

  changeFilter(data) {
    this.propertiesListOriginal = data.items;
    this.propertiesList = this.propertiesListOriginal;
    this.countOfProperties = data.totalResults;
    this.countOfAvailable = this.countOfProperties;
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
