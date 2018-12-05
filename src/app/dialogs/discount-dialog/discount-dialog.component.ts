import {Component, Inject, OnInit} from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

export interface DialogData {
  discountData: any;
}


@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.scss']
})
export class DiscountDialogComponent implements OnInit {
  newDiscount = {
    'type': '',
    'amount': '',
    'discount': ''
  };
  discountsData;

  constructor(private leadsService: LeadsService,
              private dialogRef: MatDialogRef<DiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.discountsData = this.data.discountData;
    console.log(this.data.discountData);
  }

  // getDropdownOptions(param) {
  //   this.leadsService.getDropdownOption(param).subscribe(
  //     (data:  any) => {
  //       data.items.map((item) => {
  //         this.unitTypes.push(item.LookupCode);
  //       });
  //     }
  //   );
  // }

  selected() {
    console.log('selected discount');
  }
}
