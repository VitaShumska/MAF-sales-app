import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-base-header',
  templateUrl: './base-header.component.html',
  styleUrls: ['./base-header.component.scss']
})
export class BaseHeaderComponent implements OnInit {

  href: string;
  breadcrumbsArr = [];
  headerName: string;

  constructor(
    private location: Location,
    private router: Router,
    private breadcrumbs: BreadcrumbsService
  ) {
    this.breadcrumbs.breadcrumbsEmitter
      .subscribe( breadcrumbsArr => {
        this.breadcrumbsArr = breadcrumbsArr;
        this.headerName = this.breadcrumbsArr[0].name;
      });
  }

  ngOnInit() {
    this.href = this.router.url;
  }

  goBack(): void {
    this.location.back();
  }

}
