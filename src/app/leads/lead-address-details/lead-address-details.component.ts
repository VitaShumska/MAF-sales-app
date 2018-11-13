import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lead-address-details',
  templateUrl: './lead-address-details.component.html',
  styleUrls: ['./lead-address-details.component.scss']
})
export class LeadAddressDetailsComponent implements OnInit {

  @Input() leadDetails: any = {};

  constructor() { }

  ngOnInit() {
  }

}
