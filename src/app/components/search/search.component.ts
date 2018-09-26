import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import * as _ from 'lodash';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchText;
  searchPlaceholder = 'Search by all';
  changeSearch = _.debounce(() => {this.debouncedChangeSearch(); }, 300);

  @Input() searchColumns;
  @Input() inputList;
  @Output() searchChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  public debouncedChangeSearch() {
    if (this.searchText) {
      const searchText = this.searchText.trim().toLowerCase();
      let selectedFilters = this.searchColumns;

      const filtered = this.inputList.filter((item) => {
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
    }
  }

}
