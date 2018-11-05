import { Injectable, EventEmitter} from '@angular/core';
import * as _ from 'lodash';

@Injectable()
export class BreadcrumbsService {

  public breadcrumbsEmitter: EventEmitter<any>;
  public breadcrumbsArr = [];
  constructor() {
    this.breadcrumbsEmitter = new EventEmitter();
  }

  createArr(obj) {
    const j = _.findIndex(this.breadcrumbsArr, function(o) {
      if (o['param'] === 0) {
        return o['param'] === obj.param;
      }
    });
    if (j !== -1) {
      this.breadcrumbsArr = [obj];
    }

    const i = _.findIndex(this.breadcrumbsArr, (o) => o['name'] === obj.name);
    if (i !== -1) {
      this.breadcrumbsArr.splice(i + 1);
    } else {
      this.breadcrumbsArr.push(obj);
      this.breadcrumbsArr = _.sortBy(this.breadcrumbsArr, 'param');
    }
    this.emitChanges();
  }

  emitChanges() {
    this.breadcrumbsEmitter.emit(this.breadcrumbsArr);
  }

}
