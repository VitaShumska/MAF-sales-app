import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import {FilterCloseService} from "../../services/filter-close.service";
import {MatSnackBar} from "@angular/material";
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showFilter: boolean;
  propertiesList;
  offset = 0;
  limit = 25;
  filterParams = {
    productType: '',
    phase: '',
    cluster: '',
    buildingName: '',
    floor: '',
    unitType: '',
    bedrooms: '',
    unitPriceFrom: '',
    unitPriceTo: ''
  };

  @Output() changeFilter = new EventEmitter();
  @Output() changeFilterParams = new EventEmitter();

  constructor(private apiService: ApiService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public filterClose: FilterCloseService) { }

  ngOnInit() {
    if (JSON.parse(window.sessionStorage.getItem('filterParams'))) {
      this.filterParams = JSON.parse(window.sessionStorage.getItem('filterParams'));
    }
  }

  toggleFilter() {
    this.showFilter = this.filterClose.showFilter;
    this.showFilter = !this.showFilter;
    if (this.showFilter) {
      document.getElementById('fade').style.display = 'block';
    } else {
      document.getElementById('light').style.display = 'none';
      document.getElementById('fade').style.display = 'none';
    }
    this.filterClose.toggleFilter();
  }

  getPropertiesWithFilter () {
    let filterParams = this.filterParams;
    if (this.isFilterEmpty()) {
      filterParams = null;
    }
    this.clearSearchInput();
    this.loadingSpinner.show();
    this.apiService.getPropertiesWithFilter(this.offset, this.limit, null, filterParams)
      .subscribe((data) => {
        this.loadingSpinner.hide();
        this.propertiesList  =  data;
        this.changeFilter.emit(this.propertiesList);
        this.changeFilterParams.emit(this.filterParams);
        this.toggleFilter();
      },
      (error) => {
        this.toggleFilter();
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      });
    window.sessionStorage.removeItem('filterParams');
  }

  onlyNumberKey(event) {
    return (event.charCode === 8 || event.charCode === 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  clearSearchInput() {
    const searchInput = document.getElementById('searchInput');
    searchInput['value'] = '';
  }

  isFilterEmpty () {
    let filterEmpty = true;
      Object.keys(this.filterParams).map(key => {
        if ( this.filterParams[key] !== '' ) {
          filterEmpty = false;
        }
      });
      return filterEmpty;
  }
}
