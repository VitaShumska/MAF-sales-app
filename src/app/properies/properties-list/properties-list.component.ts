import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-properties-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.scss']
})
export class PropertiesListComponent implements OnInit {
  private  contacts:  Array<object> = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private breadcrumbs:  BreadcrumbsService) {}

  propertiesListOriginal;
  propertiesList;

  displayedColumns = ['Unit Tab', 'Unit Code', 'Model', 'Plot Area', 'Built-up Area', 'Status', 'Price'];
  searchColumns = ['MAF_UnitType_c', 'MAF_UnitRegion_c', 'MAF_PlotAreaSqFt_c', 'MAF_BuiltupAreaSqFt_c', 'MAF_Status_c', 'MAF_UnitPrice_c'];

  breadcrumbObj = {
    name: 'Units',
    url: '',
    param: 0 // because is a parent
  };

  ngOnInit() {
    this.getProperties();
    this.breadcrumbsArr();
  }

  getProperties() {
    this.apiService.getProperties().subscribe((data:  Array<object>) => {
      this.propertiesListOriginal  =  data;
      this.propertiesListOriginal  =  this.propertiesListOriginal.items;
      this.propertiesList = this.propertiesListOriginal;
    });
  }

  goToPage(url) {
    this.router.navigate([url]);
  }

  changeSearch(data) {
    this.propertiesList = data;
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

}
