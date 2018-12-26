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
import { InfoDialogComponent } from '../../dialogs/info-dialog/info-dialog.component';
import {stringify} from 'querystring';
import { MockUpService } from '../../services/mock-up.service';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  sub;
  pageName;
  contactId;
  leadId;
  optyId;
  contactDetails: any = {};
  leadDetails: any = {};
  identificationContactData: any = {};
  breadcrumbObj = {
    name: '',
    backUrl: '',
    param: 0
  };
  phoneCodes = [];
  editAllow = true;
  isAllowedSave: boolean;
  discountData: any = [];
  payplansList: any = [];
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
              private mockUpService: MockUpService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.pageName = window.location.pathname.split('/')[1];
    this.isLeadOrOpportunity(this.pageName);
    // this.googleTranslateElementInit();
  }

  isLeadOrOpportunity(page) {
    switch (page) {
      case 'opportunity-details': {
        this.sub = this.route.params.subscribe(params => {
          this.contactId = params['contactId'];
          this.optyId = params['optyId'];
          this.getOpportunityById(this.optyId);
          if (this.contactId !== 'new') {
            this.getContactById(this.contactId);
            this.editAllow = false;
          } else {
            this.contactDetails = this.newContact;
          }
        });
        this.breadcrumbObj = {
          name: 'Opportunity Details',
          backUrl: '/opportunities',
          param: 0 // because is a parent
        };
        this.breadcrumbsArr();
        break;
      }
      case 'contact-details': {
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
        this.breadcrumbObj = {
          name: 'Contact Details',
          backUrl: '/leads',
          param: 0 // because is a parent
        };
        this.breadcrumbsArr();
        break;
      }
    }
  }
//////////////////////Leads functional///////////////////////
  getLeadById(id) {
    this.loadingSpinner.show();
    this.leadsService.getLeadById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.apiService.logOut();
          this.openSnackBar('Server error', 'OK');
        });
  }

  updateLead(leadId, contactId?, status?) {
    this.loadingSpinner.show();
    const data = {
      PrimaryContactId: contactId,
      AssignmentStatusCode: status
    };
    this.leadsService.updateLead(leadId, data)
      .subscribe((resp) => {
          this.loadingSpinner.hide();
          this.editAllow = false;
          this.leadDetails = resp;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }
//////////////////////Contacts functional///////////////////////
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
          this.apiService.logOut();
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
              MAF_IdentificationType_c: '',
              MAF_IDNo_c: '',
              MAF_IssuingAuthority_c: '',
              MAF_IssueDate_c: '',
              MAF_ExpiryDate_c: ''
            };
          }
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  updateIdentificationContactData() {
    this.loadingSpinner.show();
    this.leadsService.updateIdentificationContactData(this.contactId, this.identificationContactData)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.identificationContactData = data.items[0];
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  updateContact() {
    this.loadingSpinner.show();
    delete this.contactDetails['LastUpdateDate'];
    delete this.contactDetails['CreationDate'];

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
    if (this.leadId ) {
      this.contactDetails.LeadNumber = this.leadDetails.LeadNumber;
    }
    this.leadsService.createContact(this.contactDetails)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.editAllow = false;
          // if (this.leadId) {
            this.updateLead(this.leadId, data.PartyId);
            this.goToPage('/contact-details/' + data.PartyId + '/' + this.leadId);
          // } else {
          //   this.goToPage('/contact-details/' + data.PartyId + '/new');
          // }
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

//////////////////////Opportunity functional///////////////////////
  createNewOpportunity(contactName, keyContactId, unitId) {
    this.loadingSpinner.show();
    // this.leadsService.createOpportunity(contactName, keyContactId, this.unitDetails.MAF_UnitNumber_c);
    this.leadsService.createRestOpportunity(contactName, keyContactId, unitId)
      .subscribe(data => {
          this.loadingSpinner.hide();
          // this.openInfoDialog('Unit added. Opportunity created.', 'success');
          this.goToPage('opportunity-details/' + data.KeyContactId + '/' + data.OptyNumber);
          this.updateLead(this.leadsService.opportunityData.leadId, undefined, 'CONVERTED');
          this.leadsService.opportunityData = {
            showSelectBtn: true
          };
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getOpportunityById(id) {
    this.loadingSpinner.show();
    this.leadsService.getOpportunityById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
          this.getDiscount(this.leadDetails.OptyId);
          this.getPayplan();
          ////Mock up service/////
          if (this.leadDetails.OptyNumber !== this.mockUpService.currentOpt.OptyNumber) {
            this.mockUpService.currentOpt = this.leadDetails;
          } else {
            this.leadDetails = this.mockUpService.currentOpt;
          }
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  updateOpportunity(id, data) {
    this.loadingSpinner.show();
    this.leadsService.updateRestOpportunity(id, data)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getDiscount(id) {
    this.loadingSpinner.show();
    this.leadsService.getDiscount(id)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.discountData = data;
          ////Mock service////
          this.mockUpService.discountsList = this.discountData['items'];
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getPayplan() {
    this.loadingSpinner.show();
    this.leadsService.getPayplan()
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.payplansList = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  updateStatus (actionType, approvalType) {
    this.loadingSpinner.show();
    this.leadDetails.MAF_ActionType_c = actionType;
    this.leadDetails.MAF_ApprovalType_c = approvalType + ': ' + this.leadDetails.PrimaryContactPartyName;
    this.leadDetails.MAF_Action_c = this.leadDetails.MAF_Action_c + 1;

    delete this.leadDetails.UpdateFlag;
    delete this.leadDetails.DeleteFlag;
    // delete this.leadDetails.MAF_PaymentPlan_c;

    this.leadsService.updateRestOpportunity(this.optyId, this.leadDetails)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.leadDetails = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }
/////////////////////////////Update data about leads and contact////////////////////
  updateData() {
    this.updateContact();
    // this.updateIdentificationContactData();
  }

/////////////////////////////Additional functions////////////////////
  addUnit() {
    this.leadsService.opportunityData.contactName = this.leadDetails.PrimaryContactPartyName;
    this.leadsService.opportunityData.keyContactId = this.leadDetails.PrimaryContactId;
    this.leadsService.opportunityData.backUrl = '/contact-details/' + this.contactId + '/' + this.leadId;
    this.leadsService.opportunityData.leadId = this.leadId;
    if (this.leadsService.opportunityData.unitId) {
      this.createNewOpportunity(this.leadsService.opportunityData.contactName, this.leadsService.opportunityData.keyContactId, this.leadsService.opportunityData.unitId);
    } else {
      this.goToPage('/units');
    }
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

  openInfoDialog(text, type): void {
    const dialogRef = this.dialog.open(InfoDialogComponent, {
      width: '60vw',
      data: {
        text: text,
        type: type
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.goToPage('/opportunities');
    });
    setTimeout(() => dialogRef.close(), 2000);
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openSelectPayplanDialog(): void {
    const dialogRef = this.dialog.open(SelectPayplanDialogComponent, {
      data: {
        payplansList: this.payplansList['items'],
        optyId: this.leadDetails.OptyId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leadDetails.MAF_PaymentPlan_Id_c = result.id;
        this.leadDetails.MAF_PaymentPlan_c = result.name;
        this.mockUpService.currentOpt['MAF_PaymentPlan_c'] = this.leadDetails.MAF_PaymentPlan_c;
      }
    });
  }

  isAllowed(data) {
    this.isAllowedSave = data;
  }

  openDiscountDialog(): void {
    const dialogRef = this.dialog.open(DiscountDialogComponent, {
      data: {
        // discountData: this.discountData['items'],
        optyId: this.leadDetails.OptyId
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.leadDetails.MAF_BdgtAmount_c = this.leadDetails.MAF_Price_c;
        this.leadDetails.MAF_DiscountOpty_c = 0;
        result.map(item => {
          if (item.Type_c === 'Amount') {
            this.leadDetails.MAF_DiscountOpty_c += +item.DiscountValue_c;
          } else if (item.Type_c === 'Percentage') {
            this.leadDetails.MAF_DiscountOpty_c += +this.leadDetails.MAF_Price_c * (item.DiscountValue_c) / 100;
          }
          this.leadDetails.MAF_BdgtAmount_c = this.leadDetails.MAF_Price_c - this.leadDetails.MAF_DiscountOpty_c;
          this.mockUpService.currentOpt.MAF_BdgtAmount_c = this.leadDetails.MAF_BdgtAmount_c;
        });
      }
    });
  }

  googleTranslateElementInit() {
    const apiKey = 'AIzaSyAp7N8VtPpiko4cXfNigXmx3HE6FFELJLc';
    let url = 'https://translation.googleapis.com/language/translate/v1';
    url += '?key=' + apiKey;
    url += '&text=text';
    url += '&source=en';
    url += '&target=ar';
    // url += '&q=text' + escape($('#txtSource').val());
    this.apiService.googleTranslateElementInit(url)
      .subscribe(data => {
        console.log('translate', data);
      },
      (error) => {
        this.openSnackBar('Server error', 'OK');
      });
  }

  ////////////Functional for mock up//////////////
  getMockUpData() {
    this.mockUpService.currentOpt['MAF_PaymentPlan_c'] = this.leadDetails.MAF_PaymentPlan_c;
  }

}
