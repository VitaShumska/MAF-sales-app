import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-lead-arabic-details',
  templateUrl: './lead-arabic-details.component.html',
  styleUrls: ['./lead-arabic-details.component.scss']
})
export class LeadArabicDetailsComponent implements OnInit {

  @Input() leadDetails: any = {};

  constructor() { }

  ngOnInit() {
  }

}
