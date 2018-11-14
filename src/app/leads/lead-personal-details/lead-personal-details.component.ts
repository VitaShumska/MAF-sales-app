import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-lead-personal-details',
  templateUrl: './lead-personal-details.component.html',
  styleUrls: ['./lead-personal-details.component.scss']
})
export class LeadPersonalDetailsComponent implements OnInit {

  @Input() leadDetails: any = {};
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
    name: 'Phone',
    ngModel: 'OverallPrimaryFormattedPhoneNumber'
  }];

  emailInputs = [{
    id: 1,
    name: 'Email',
    ngModel: 'EmailAddress'
  }];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.group = this.formBuilder.group({
      firstName: [this.leadDetails.PrimaryContactPersonFirstName],
      food: [],
      phone: this.formBuilder.array([
        this.createInput()
      ])
    });
    console.log('contact', this.leadDetails);
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
   }
  }

  removeField(type) {
    if (type === 'phone') {
      this.phoneInputs.splice(this.phoneInputs.length - 1, 1);
    } else if (type === 'email') {
      this.emailInputs.splice(this.emailInputs.length - 1, 1);
    }
  }

  changes() {
    console.log(this.leadDetails);
  }

}
