import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { LeadsService } from '../../services/leads.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';

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
    'Name': 'test 55',
    // 'PrimaryContactId': 300000007072390,
    'MAF_Project_c': 'Tilal Al Ghaf - Dubai',
    'MAF_SOURCE_c': 'Referral_TAG',
    'MethodOfEnquiry_c': 'Call Center_TAG'
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
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
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
          this.openInfoDialog('Lead created', 'success');
          this.goToPage('/contact-details/new/' + data.LeadId);
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

  openInfoDialog(text,type): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '60vw',
      data: {
        text: text,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
