import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LeadsService } from '../../services/leads.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatDialog, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-create-lead',
  templateUrl: './create-lead.component.html',
  styleUrls: ['./create-lead.component.scss']
})
export class CreateLeadComponent implements OnInit {

  newLead: any = {
    // 'MAF_PrimaryContact_c': '',
    // 'secondaryPurchaser': '',
    // 'OwnerPartyName': '',
    // 'MAF_UnitType_c': '',
    // 'unitNumber': ''
    'Name': 'test'
  };
  breadcrumbObj = {
    name: 'Create Lead',
    backUrl: '/leads',
    param: 0 // because is a parent
  };

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private leadsService: LeadsService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.breadcrumbsArr();
    // this.newLead.unitNumber = this.leadsService.unitId;
  }

  createLead() {
    this.loadingSpinner.show();
    console.log('cerate', this.newLead);
    this.leadsService.createLead(this.newLead)
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
