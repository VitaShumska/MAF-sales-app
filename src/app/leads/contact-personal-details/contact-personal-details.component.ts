import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import {Router} from "@angular/router";

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

  group: FormGroup;

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

  addUnit = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.group = this.formBuilder.group({
      firstName: [this.contactDetails.PrimaryContactPersonFirstName],
      food: [],
      phone: this.formBuilder.array([
        this.createInput()
      ])
    });
    console.log('contact', this.contactDetails);
  }

  createInput() {
    return this.formBuilder.group({
      phone1: ['', Validators.required]
    });
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

  changes() {
    console.log(this.contactDetails);
  }

}
