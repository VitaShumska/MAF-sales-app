import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation, NgxGalleryImageSize} from 'ngx-gallery';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';
import { ApiService } from '../../services/api.service';
import { LeadsService } from '../../services/leads.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatSnackBar, MatDialog, MatDialogConfig } from '@angular/material';
import { SelectPayplanDialogComponent } from '../../dialogs/select-payplan-dialog/select-payplan-dialog.component';
import { DiscountDialogComponent } from '../../dialogs/discount-dialog/discount-dialog.component';

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
  phoneCodes = [];
  editAllow = true;
  newContact = {
    'FirstName' : '',
    'LastName' : '',
    // 'LastNamePrefix' : '',
    'MiddleName' : '',
    // 'OwnerName' : '',
    // 'Type' : '',
    // 'DateOfBirth' : '',
    // 'PlaceOfBirth' : '',
    // 'Gender' : '',
    // 'Title' : '',
    // 'CreationDate' : '',
    // 'LastUpdateDate' : '',
    // 'LastUpdatedBy' : '',
    // 'MobileCountryCode' : '',
    'MobileNumber' : '',
    'EmailAddress' : '',
    // 'ContactUniqueName' : '',
    // 'AddressNumber' : '',
    // 'AddressLine1' : '',
    // 'AddressLine2' : '',
    // 'AddressLine3' : '',
    // 'AddressLine4' : '',
    // 'City' : '',
    // 'Country' : '',
    // 'PersonDEO_ArabicFirstName_c' : '',
    // 'PersonDEO_ArabicMiddleName_c' : '',
    // 'PersonDEO_ArabicLastName_c' : '',
    // 'PersonDEO_Nationality_c' : '',
    // 'PersonDEO_Residence_c' : '',
    // 'PersonDEO_MAF_FirstNameOfFather_c' : '',
    // 'PersonDEO_MAF_ArabicFirstNameOfFather_c' : '',
    // 'PersonDEO_MAF_ArabicFirstNameOfMother_c' : '',
    // 'PersonDEO_MAF_AddressArb_c' : ''
  };

  constructor(private route: ActivatedRoute,
              private breadcrumbs:  BreadcrumbsService,
              private router: Router,
              private apiService: ApiService,
              private leadsService: LeadsService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.contactId = params['contactId'];
      this.leadId = params['leadId'];
      if (this.contactId !== 'new' && this.leadId !== 'new') {
        this.getContactById(this.contactId);
        this.getIdentificationContactData();
        this.getLeadById(this.leadId);
        this.editAllow = false;
      } else {
        this.contactDetails = this.newContact;
      }
    });
    this.breadcrumbsArr();
    // this.googleTranslateElementInit();
  }

  getContactById (id) {
    this.loadingSpinner.show();
    this.leadsService.getContactById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.contactDetails = data.items[0];
          delete this.contactDetails.UpdateFlag;
          delete this.contactDetails.DeleteFlag;
          delete this.contactDetails.links;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getIdentificationContactData () {
    this.loadingSpinner.show();
    this.leadsService.getIdentificationContactData(this.contactId)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.identificationContactData = data.items[0];
          if (data.items.length === 0){
            this.identificationContactData = {
              'MAF_IdentificationType_c': '',
              'MAF_IDNo_c': '',
              'MAF_IssuingAuthority_c': '',
              'MAF_IssueDate_c': '',
              'MAF_ExpiryDate_c': ''
            };
          }
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getLeadById(id) {
    this.loadingSpinner.show();
    this.leadsService.getLeadById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  updateContact() {
    this.loadingSpinner.show();
    console.log('update', this.contactDetails.PartyNumber, this.contactDetails);
    this.leadsService.updateContact(this.contactDetails.PartyNumber, this.contactDetails)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.editAllow = false;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  createContact() {
    this.loadingSpinner.show();
    console.log('cerate', this.contactDetails);
    this.leadsService.createContact(this.contactDetails)
      .subscribe(data => {
          this.loadingSpinner.hide();
          console.log('created!!!!', data);
          this.editAllow = false;
          this.goToPage('/contact-details/' + data.PartyId + '/new');
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  addUnit() {
    this.leadsService.contactName = this.leadDetails.PrimaryContactPartyName;
    this.leadsService.keyContactId = this.leadDetails.PrimaryContactId;
    this.goToPage('/units');
  }

  goToPage(url) {
    this.router.navigate([url]);
  }

  breadcrumbsArr() {
    this.breadcrumbObj['url'] = this.router.url;
    this.breadcrumbs.createArr(this.breadcrumbObj);
  }

  changeEditAccess() {
    this.editAllow = true;
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
      }
    });
  }

  openDiscountDialog(id: number): void {
    const config = new MatDialogConfig();
    // config.data = _.clone(mandant);

    const dialogRef = this.dialog.open(DiscountDialogComponent, config);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      }
    });
  }

  googleTranslateElementInit() {
    let url = "https://translation.googleapis.com/language/translate/v2?key=AIzaSyCZMgtddy1pj0JBTIzyZFo35qwCvMudiRo";
    url += "&source=en";
    url += "&target=ar";
    url += "&q=text";
    // url += "&q=text" + escape($("#txtSource").val());
    this.apiService.googleTranslateElementInit(url)
      .subscribe(data => {
        console.log('translate!!!!', data);
      },
      (error) => {
        this.openSnackBar('Server error', 'OK');
      });
  }

}
