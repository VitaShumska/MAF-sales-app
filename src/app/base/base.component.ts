import { Component, OnInit } from '@angular/core';
import { FilterCloseService } from '../services/filter-close.service';


@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor(private filterClose: FilterCloseService) {
  }

  ngOnInit() {
  }

  closeFilter() {
    this.filterClose.closeFilter(false);
  }

}
