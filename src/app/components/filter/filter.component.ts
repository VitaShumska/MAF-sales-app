import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showFilter = false;
  propertiesList;
  productType;
  phase;
  unitType;
  bedrooms;
  unitModel;
  unitPrice;
  @Output() changeFilter = new EventEmitter();

  constructor(private apiService: ApiService) { }

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
    this.apiService.getPropertiesWithFilter(this.productType, this.phase, this.unitType, this.unitModel, this.bedrooms, this.unitPrice).subscribe((data:  Array<object>) => {
      this.propertiesList  =  data;
      this.propertiesList =  this.propertiesList.items;
      console.log('list', this.propertiesList);
      this.changeFilter.emit(this.propertiesList);
      this.toggleFilter();
    });
  }

}
