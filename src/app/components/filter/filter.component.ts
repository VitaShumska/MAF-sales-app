import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  showFilter = false;

  constructor() { }

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

}
