import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
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
  @ViewChild('phone') phone: ElementRef;

  afuConfig = {
    uploadAPI: {
      url:"https://ebrl-test.fa.em2.oraclecloud.com/crmRestApi/resources/11.13.17.11/"
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
  addUnit = false;
  errorMessage: any = '';
  successMessage: any = '';
  emailRegExp = EMAIL_REGEXP;
  phoneNumberRegExp = PHONE_NUMBER_REGEXP;
  isValid: boolean = false;
  enableSignUpButton: boolean = false;
  isValidEmail: boolean = true;
  isValidPhoneNumber: boolean = true;
  selectedCountry;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

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
    this.enableSignUpButton = this.leadDetails.EmailAddress && this.leadDetails.MobileNumber;

    this.emailInputs.map(item => this.isValid = this.isValid &&  this.validateEmail(item));
    if (!this.isValid) {
      return this.isValid;
    }

    this.phoneInputs.map(item => this.isValid = this.isValid && this.validatePhoneNumber(item));
    if (!this.isValid) {
      return this.isValid;
    }
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
      this.addUnit = true;
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
