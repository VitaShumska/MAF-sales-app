import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import * as _ from 'lodash';

@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  private  contacts:  Array<object> = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private breadcrumbs:  BreadcrumbsService,
    private loadingSpinner: LoadingSpinnerService,
    public snackBar: MatSnackBar) {}

  propertiesListOriginal;
  propertiesList;
  filterParams;

  displayedColumns = [
    {
      name: 'Unit Type',
      key: 'MAF_UnitType_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit Code',
      key: 'MAF_UnitRegion_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Model',
      key: 'MAF_UnitModel_c',
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

  // displayedColumns = [ ];
  searchColumns = [ 'MAF_PlotAreaSqFt_c', 'MAF_BuiltupAreaSqFt_c', 'MAF_Status_c', 'MAF_UnitPrice_c'];

  breadcrumbObj = {
    name: 'Units',
    url: '',
    param: 0 // because is a parent
  };

  ngOnInit() {
    this.getProperties();
    this.breadcrumbsArr();
  }

  getProperties() {
    this.loadingSpinner.show();
    this.apiService.getProperties()
      // .finally(() => this.loadingSpinner.hide())
      .subscribe(
        (data:  Array<object>) => {
          this.loadingSpinner.hide();
          this.propertiesListOriginal  =  data;
          this.propertiesListOriginal  =  this.propertiesListOriginal.items;
          this.propertiesList = this.propertiesListOriginal;
        },
        (error) => {
          this.openSnackBar('Server error', 'OK');
          this.loadingSpinner.hide();
        }
      );
  }

  getPropertiesWithFilter(sortParam?, filterParams?) {
    this.loadingSpinner.show();
    this.apiService.getPropertiesWithFilter(sortParam, filterParams).subscribe(
      (data:  Array<object>) => {
        this.loadingSpinner.hide();
        this.propertiesListOriginal = data;
        this.propertiesListOriginal = this.propertiesListOriginal.items;
        this.propertiesList = this.propertiesListOriginal;
      }
    );
  }

  goToPage(url) {
    this.router.navigate([url]);
  }

  changeSearch(data) {
    this.propertiesList = data;
  }

  changeFilter(data) {
    this.propertiesList = data;
  }

  changeFilterParams(data) {
    this.filterParams = data;
    console.log('this.filterParams', this.filterParams);
  }

  sortByKey(sortElem) {
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
    this.getPropertiesWithFilter(sortElem, this.filterParams)

    // this.filterParams ? this.getPropertiesWithFilter(sortElem, this.filterParams) : this.getPropertiesWithFilter(sortElem);
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

}
