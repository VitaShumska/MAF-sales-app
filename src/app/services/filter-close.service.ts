import { Injectable, EventEmitter} from '@angular/core';
import * as _ from 'lodash';
import {getMatTooltipInvalidPositionError} from "@angular/material";

@Injectable()
export class FilterCloseService {
  showFilter = false;

  public filterEmitter: EventEmitter<any>;


  constructor() {
    this.filterEmitter = new EventEmitter();
  }

  toggleFilter(toggleFilter?) {
    if (toggleFilter) {
      this.showFilter = toggleFilter;
    } else {
      this.showFilter = !this.showFilter;
    }
    this.filterEmitter.emit(this.showFilter);
  }

  closeFilter(showFilter) {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
    this.toggleFilter(false);
  }
}
