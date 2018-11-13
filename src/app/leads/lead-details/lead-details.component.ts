import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize} from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectPayplanDialogComponent } from '../../dialogs/select-payplan-dialog/select-payplan-dialog.component';

@Component({
  selector: 'app-lead-details',
  templateUrl: './lead-details.component.html',
  styleUrls: ['./lead-details.component.scss']
})
export class LeadDetailsComponent implements OnInit {

  sub;
  leadId;
  leadDetails: any = {};
  breadcrumbObj = {
    name: 'Lead Details',
    backUrl: '/leads',
    param: 0 // because is a parent
  };

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private apiService: ApiService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.leadId = params['leadId'];
      if (this.leadId) {
        this.getContactById();
      } else {
      }
    });
    this.breadcrumbsArr();
    this.getContacts();
  }

  getContactById () {
    this.loadingSpinner.show();
    this.apiService.getContactById(this.leadId)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
          console.log('contact', data);
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getContacts() {
    this.loadingSpinner.show();
    this.apiService.getContacts(0, 25)
      .subscribe(data => {
          this.loadingSpinner.hide();
          console.log('contacts', data);
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

  openSelectPayplanDialog(id: number): void {
    const config = new MatDialogConfig();
    // config.data = _.clone(mandant);

    const dialogRef = this.dialog.open(SelectPayplanDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('dialog', id);
      }
    });
  }

}
