import {Component, Inject, OnInit} from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { MockUpService } from '../../services/mock-up.service';
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
    DiscountValue_c: +'',
    MAF_OptyId_Id_c: ''
  };
  discountsData;
  optyId;

  constructor(private leadsService: LeadsService,
              private mockUpService: MockUpService,
              private dialogRef: MatDialogRef<DiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    console.log(this.data);
    // this.discountsData = this.data.discountData;
    this.discountsData = this.mockUpService.discountsList;
    this.optyId = this.data['optyId'];
    this.newDiscount.MAF_OptyId_Id_c = this.optyId;
  }

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

  createDiscount(data?) {
    this.mockUpService.discountsList.push(this.newDiscount);
    this.discountsData = this.mockUpService.discountsList;
    this.newDiscount = {
      DiscountType_c: '',
      Type_c: '',
      DiscountValue_c: +'',
      MAF_OptyId_Id_c: ''
    };
    // this.leadsService.createDiscount(data, this.optyId)
      // .subscribe(
        // (res: any) => {
          // console.log('data', res);
          // this.getDiscount(this.optyId);
        // },
        // (error) => {
        // }
      // );
  }

  aplyDiscount() {
    return this.mockUpService.discountsList;
  }
}
