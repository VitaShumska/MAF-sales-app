import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  closeFilter() {
    document.getElementById('light').style.display = 'none';
    document.getElementById('fade').style.display = 'none';
  }

}
