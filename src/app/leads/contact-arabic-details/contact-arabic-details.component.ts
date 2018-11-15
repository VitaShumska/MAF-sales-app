import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-contact-arabic-details',
  templateUrl: './contact-arabic-details.component.html',
  styleUrls: ['./contact-arabic-details.component.scss']
})
export class ContactArabicDetailsComponent implements OnInit {

  @Input() contactDetails: any = {};

  constructor() { }

  ngOnInit() {
  }

}
