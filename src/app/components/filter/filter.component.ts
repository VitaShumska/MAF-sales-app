import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showFilter = false;
  propertiesList;
  filterParams = {
    productType: '',
    phase: '',
    unitType: '',
    bedrooms: '',
    unitModel: '',
    unitPrice: ''
  };

  @Output() changeFilter = new EventEmitter();
  @Output() changeFilterParams = new EventEmitter();

  constructor(private apiService: ApiService,
              private loadingSpinner: LoadingSpinnerService) { }

  ngOnInit() {
  }

  toggleFilter() {
    this.showFilter = !this.showFilter;
    if (this.showFilter) {
      document.getElementById('fade').style.display = 'block';
    } else {
      document.getElementById('light').style.display = 'none';
      document.getElementById('fade').style.display = 'none';
    }
  }

  getPropertiesWithFilter () {
    this.loadingSpinner.show();
    this.apiService.getPropertiesWithFilter(null, this.filterParams).subscribe((data:  Array<object>) => {
      this.loadingSpinner.hide();
      this.propertiesList  =  data;
      this.propertiesList =  this.propertiesList.items;
      this.changeFilter.emit(this.propertiesList);
      this.changeFilterParams.emit(this.filterParams);
      this.toggleFilter();
    });
  }

}
