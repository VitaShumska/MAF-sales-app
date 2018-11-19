import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import {MatDialog, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss']
})
export class CreateLeadComponent implements OnInit {

  newLead: any = {
    'primaryPurchaser': '',
    'secondaryPurchaser': '',
    'leadOwner': '',
    'unitType': '',
    'unitNumber': ''
  };
  breadcrumbObj = {
    name: 'Create Lead',
    backUrl: '/leads',
    param: 0 // because is a parent
  };

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private apiService: ApiService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.breadcrumbsArr();
  }

  createLead() {
    this.loadingSpinner.show();
    console.log('cerate', this.newLead);
    this.apiService.createLead(this.newLead)
      .subscribe(data => {
          this.loadingSpinner.hide();
          console.log('created!!!!', data);
          this.openSnackBar('Lead created', 'OK');
          this.goToPage('/leads');
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  goToPage(url) {
    this.router.navigate([url]);
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
