import {Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { LeadsService } from '../../services/leads.service'
import {Router} from "@angular/router";
import {
  DEFAULT_ERROR_MESSAGE,
  EMAIL_REGEXP,
  PHONE_NUMBER_REGEXP,
  COUNTRIES
} from '../../constants';

@Component({
  selector: 'app-contact-personal-details',
  templateUrl: './contact-personal-details.component.html',
  styleUrls: ['./contact-personal-details.component.scss']
})
export class ContactPersonalDetailsComponent implements OnInit {

  @Input() contactDetails: any = {};
  @Input() leadDetails: any = {};
  @Input() editAllow: boolean;
  @Input() pageName: string;
  @Output() isAllowedSave = new EventEmitter();
  @ViewChild('phone') phone: ElementRef;

  afuConfig = {
    uploadAPI: {
      url: 'https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/latest/'
    },
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    theme: 'attachPin',
    attachPinText: '+ add attachment'
  };

  i = 1;

  phoneInputs = [{
    id: 1,
    name: 'Primary Phone',
    ngModel: 'MobileNumber'
    // ngModel: 'OverallPrimaryFormattedPhoneNumber'
  }];

  emailInputs = [{
    id: 1,
    name: 'Primary Email',
    ngModel: 'EmailAddress'
  }];

  countries = COUNTRIES;
  addedUnit = false;
  errorMessage: any = '';
  successMessage: any = '';
  emailRegExp = EMAIL_REGEXP;
  phoneNumberRegExp = PHONE_NUMBER_REGEXP;
  isValid: boolean = false;
  enableSaveButton: boolean = false;
  isValidEmail: boolean = true;
  isValidPhoneNumber: boolean = true;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private leadsService: LeadsService) { }

  ngOnInit() {}

  public clearError() {
    this.errorMessage = '';
    this.successMessage = '';
  }

  public showErrorMessage(message?: string) {
    this.successMessage = '';
    this.errorMessage = message ? message : DEFAULT_ERROR_MESSAGE;
  }

  public showSuccessMessage(message?: string) {
    this.errorMessage = '';
    this.successMessage = message;
  }

  public validateEmail(email?) {
    // this.emailInputs.map(item => {
      this.isValidEmail = this.emailRegExp.test(email);
      // console.log(this.isValidEmail, this.contactDetails[item.ngModel], item.ngModel);
    // });
    // console.log(this.isValidEmail);
    return this.isValidEmail;
  }

  public validatePhoneNumber(phone?) {
    this.isValidPhoneNumber = this.phoneNumberRegExp.test(phone);
    return this.isValidPhoneNumber;
  }

  validateAll() {
    this.clearError();
    // this.enableSaveButton = this.leadDetails.EmailAddress && this.leadDetails.MobileNumber;
    // this.isAllowedSave.emit();
    this.emailInputs.map(item => this.isValid = this.isValid &&  this.validateEmail(item));
    if (!this.isValid) {
      return this.isValid;
    }

    this.phoneInputs.map(item => this.isValid = this.isValid && this.validatePhoneNumber(item));
    if (!this.isValid) {
      return this.isValid;
    }
  }

  isNumberKey(evt) {
    const charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode !== 46 && charCode > 31
      && (charCode < 48 || charCode > 57))
      return false;
    return true;
  }

  addUnit() {
    this.leadsService.opportunityData.contactName = this.leadDetails.PrimaryContactPartyName;
    this.leadsService.opportunityData.keyContactId = this.leadDetails.PrimaryContactId;
    this.leadsService.opportunityData.backUrl = window.location.pathname;
    this.goToPage('/units');
  }

  changeUnit(unitId) {
    this.leadsService.opportunityData.optyNumber = this.leadDetails.OptyNumber;
    this.leadsService.opportunityData.unitId = unitId;
    this.leadsService.opportunityData.backUrl = window.location.pathname;
    this.leadsService.opportunityData.showSelectBtn = true;
    this.goToPage('/units');
  }

  showUnitInfo() {
    this.leadsService.opportunityData = {
      contactName: '',
      keyContactId: '',
      unitId: '',
      optyNumber: '',
      backUrl: window.location.pathname,
      showSelectBtn: false
    };
    this.goToPage('/unit-details/' + this.leadDetails.MAF_Product_Id_c);
  }

  addField(type) {
   if (type === 'phone') {
     this.phoneInputs.push({
       id: this.phoneInputs.length + 1,
       name: 'Phone ' + (this.phoneInputs.length + 1),
       ngModel: 'PrimaryContactPhone' + (this.phoneInputs.length + 1)
     });
   } else if (type === 'email') {
     this.emailInputs.push({
       id: this.emailInputs.length + 1,
       name: 'Email ' + (this.emailInputs.length + 1),
       ngModel: 'PrimaryContactPhone' + (this.emailInputs.length + 1)
     });
   } else if (type === 'unit') {
      this.addedUnit = true;
    }
  }

  removeField(type) {
    if (type === 'phone') {
      this.phoneInputs.splice(this.phoneInputs.length - 1, 1);
    } else if (type === 'email') {
      this.emailInputs.splice(this.emailInputs.length - 1, 1);
    }
  }

  goToPage(url) {
    this.router.navigate([url]);
  }
}
