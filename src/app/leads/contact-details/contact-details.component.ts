import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize} from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectPayplanDialogComponent } from '../../dialogs/select-payplan-dialog/select-payplan-dialog.component';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  sub;
  contactId;
  leadId;
  contactDetails: any = {};
  leadDetails: any = {};
  identificationContactData: any = {};
  breadcrumbObj = {
    name: 'Contact Details',
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
      this.contactId = params['contactId'];
      this.leadId = params['leadId'];
      console.log('contact', this.contactId, this.leadId);
      if (this.contactId) {
        this.getContactById();
        this.getIdentificationContactData();
        this.getLeadById();
      } else {
      }
    });
    this.breadcrumbsArr();
  }

  getContactById () {
    this.loadingSpinner.show();
    this.apiService.getContactById(this.contactId)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.contactDetails = data.items[0];
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getIdentificationContactData () {
    this.loadingSpinner.show();
    this.apiService.getIdentificationContactData(this.contactId)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.identificationContactData = data.items[0];
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getLeadById() {
    this.loadingSpinner.show();
    this.apiService.getLeadById(this.leadId)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
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
