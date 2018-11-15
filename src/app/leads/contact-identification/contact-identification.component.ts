import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-identification',
  templateUrl: './contact-identification.component.html',
  styleUrls: ['./contact-identification.component.scss']
})
export class ContactIdentificationComponent implements OnInit {

  @Input() identificationContactData: any = {};

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
