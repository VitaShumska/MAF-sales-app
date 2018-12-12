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
    DiscountType_c: '',
    Type_c: '',
    DiscountValue_c: '',
    MAF_OptyId_Id_c: ''
  };
  discountsData;
  optyId;

  constructor(private leadsService: LeadsService,
              private dialogRef: MatDialogRef<DiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.discountsData = this.data.discountData;
    this.newDiscount.MAF_OptyId_Id_c = this.discountsData[0].MAF_OptyId_Id_c;
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

  getDiscount(id) {
    this.leadsService.getDiscount(id)
      .subscribe(
        (data: any) => {
          this.discountsData = data;
        },
        (error) => {
        }
      );
  }

  createDiscount(data) {
    this.leadsService.createDiscount(data, this.optyId)
      .subscribe(
        (res: any) => {
          console.log('data', res);
          this.getDiscount(this.optyId);
        },
        (error) => {
        }
      );
  }

  selected() {
    console.log('selected discount');
  }
}
