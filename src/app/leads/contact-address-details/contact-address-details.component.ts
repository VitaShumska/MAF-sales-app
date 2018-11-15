import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-address-details',
  templateUrl: './contact-address-details.component.html',
  styleUrls: ['./contact-address-details.component.scss']
})
export class ContactAddressDetailsComponent implements OnInit {

  @Input() contactDetails: any = {};

  constructor() { }

  ngOnInit() {
  }

}
