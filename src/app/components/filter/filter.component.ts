import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { FilterCloseService } from "../../services/filter-close.service";
import { MatSnackBar } from "@angular/material";
import * as _ from 'lodash';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showFilter: boolean;
  responseList;
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
    unitPriceTo: '',
    leadName: '',
    phone: '',
    email: '',
    leadNumber: '',
    rank: '',
    qualification: '',
    nationality: '',
    creation: '',
    lastUpdate: '',
    assignedTo: ''
  };
  unitTypes:any[] = [];

  @Input() type;
  @Output() changeFilter = new EventEmitter();
  @Output() changeFilterParams = new EventEmitter();

  constructor(private apiService: ApiService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public filterClose: FilterCloseService) { }

  ngOnInit() {
    this.getDropdownOptions('MAF_PROD_UNIT_TYPE');
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
    this.filterParams.creation ? (this.filterParams.creation =  new Date(this.filterParams.creation).toISOString()) : false;
    this.filterParams.lastUpdate ? (this.filterParams.lastUpdate =  new Date(this.filterParams.lastUpdate).toISOString()) : false;
    let filterParams = this.filterParams;
    if (this.isFilterEmpty()) {
      filterParams = null;
    }
    this.clearSearchInput();
    this.loadingSpinner.show();
    if (this.type === 'properties') {
      this.apiService.getPropertiesWithFilter(this.offset, this.limit, null, filterParams)
        .subscribe((data) => {
            this.loadingSpinner.hide();
            this.responseList  =  data;
            this.changeFilter.emit(this.responseList);
            this.changeFilterParams.emit(this.filterParams);
            this.toggleFilter();
          },
          (error) => {
            this.toggleFilter();
            this.loadingSpinner.hide();
            this.openSnackBar('Server error', 'OK');
          });
    } else if (this.type === 'leads') {
      this.apiService.getLeadsWithFilter(this.offset, this.limit, null, filterParams)
        .subscribe((data) => {
            this.loadingSpinner.hide();
            this.responseList  =  data;
            this.changeFilter.emit(this.responseList);
            this.changeFilterParams.emit(this.filterParams);
            this.toggleFilter();
          },
          (error) => {
            this.toggleFilter();
            this.loadingSpinner.hide();
            this.openSnackBar('Server error', 'OK');
          });
    }

    window.sessionStorage.removeItem('filterParams');
  }

  getDropdownOptions(param) {
    this.apiService.getDropdownOption(param).subscribe(
      (data:  any) => {
        data.items.map((item) => {
          this.unitTypes.push(item.LookupCode);
        });
      },
      (error) => {
        this.loadingSpinner.hide();
        this.openSnackBar('Server error', 'OK');
      }
    );
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

  clearAllFilters() {
    this.filterParams = {
      productType: '',
      phase: '',
      cluster: '',
      buildingName: '',
      floor: '',
      unitType: '',
      bedrooms: '',
      unitPriceFrom: '',
      unitPriceTo: '',
      leadName: '',
      rank: '',
      qualification: '',
      nationality: '',
      phone: '',
      email: '',
      leadNumber: '',
      creation: '',
      lastUpdate: '',
      assignedTo: ''
    };
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
