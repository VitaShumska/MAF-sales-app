import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lead-identification',
  templateUrl: './lead-identification.component.html',
  styleUrls: ['./lead-identification.component.scss']
})
export class LeadIdentificationComponent implements OnInit {

  @Input() leadDetails: any = {};

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

  constructor() { }

  ngOnInit() {
  }

}