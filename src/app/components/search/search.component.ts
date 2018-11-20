import {Component, OnInit, EventEmitter, Input, Output, ViewChild, ElementRef} from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText;
  searchPlaceholder = 'Search';
  changeSearch = _.debounce(() => {this.debouncedChangeSearch(); }, 300);
  location;

  @Input() searchColumns;
  @Input() inputList: any[] = [];
  @Output() searchChange = new EventEmitter();

  constructor() {}

  ngOnInit() {
    this.searchText = sessionStorage.getItem('searchText');
    this.changeSearch();
    this.location = location.href;
    console.log('location', this.location);
  }

  public debouncedChangeSearch() {
    sessionStorage.setItem('searchText', this.searchText);
    if (this.searchText) {
      const searchText = this.searchText.trim().toLowerCase();
      let selectedFilters = this.searchColumns;

      const filtered = this.inputList.filter((item) => {
        Object.keys(item).map(key => {
          if (item[key]) {
            item[key] = item[key].toString();
          }
        });

        for (let i = 0; i < selectedFilters.length; i++) {
          if (item[selectedFilters[i]] && typeof item[selectedFilters[i]] === 'string') {
            if (item[selectedFilters[i]].toLowerCase().indexOf(searchText) !== -1) {
              return true;
            }
          } else if (typeof item[selectedFilters[i]] === 'object' && item[selectedFilters[i]] !== null) {
            let tr;
            item[selectedFilters[i]].forEach( (item) => {
              if (!tr && item.name.toLowerCase().indexOf(searchText) !== -1) {
                tr = true;
              }
            });
            return tr;
          }
        }
        return false;
      });
      this.searchChange.emit(filtered);
    } else {
      this.searchChange.emit(this.inputList);
      localStorage.removeItem('searchText');
    }
  }
}
