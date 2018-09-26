import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { BreadcrumbsService } from '../services/breadcrumbs.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  breadcrumbObj = {
    name: 'Home',
    url: '',
    param: 0 // because is a parent
  };

  constructor(
    private router: Router,
    private breadcrumbs:  BreadcrumbsService) { }

  ngOnInit() {
    this.breadcrumbsArr();
  }

  goToPage(url) {
    this.router.navigate([url]);
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

}
