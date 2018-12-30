import {Component, Inject, OnInit} from '@angular/core';
import { LeadsService } from '../../services/leads.service';
import { MockUpService } from '../../services/mock-up.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

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
  discountTypes = ['Bulk', 'Loyalty', 'Consortium', 'Approved Discount', 'Payment Plan'];

  constructor(private leadsService: LeadsService,
              private mockUpService: MockUpService,
              private dialogRef: MatDialogRef<DiscountDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.discountsData = this.data.discountData;
    console.log('discounts', this.discountsData);
    // this.discountsData = this.mockUpService.discountsList;
    this.optyId = this.data['optyId'];
    this.newDiscount.MAF_OptyId_Id_c = this.optyId;
  }

  getDiscount(id) {
    this.leadsService.getDiscount(id)
      .subscribe(
        (data: any) => {
          this.discountsData = data['items'];
          console.log('discounts', this.discountsData);
        },
        (error) => {
        }
      );
  }

  createDiscount() {
    // this.mockUpService.discountsList.push(this.newDiscount);
    // this.discountsData = this.mockUpService.discountsList;

    this.leadsService.createDiscount(this.newDiscount)
      .subscribe(
        (res: any) => {
          this.getDiscount(this.optyId);
          this.newDiscount = {
            DiscountType_c: '',
            Type_c: '',
            DiscountValue_c: '',
            MAF_OptyId_Id_c: this.optyId
          };
        });
  }

  aplyDiscount() {
    return this.discountsData;
  }
}
