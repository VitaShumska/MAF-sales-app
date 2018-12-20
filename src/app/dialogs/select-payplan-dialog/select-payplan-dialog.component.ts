import {Component, Inject, OnInit} from '@angular/core';
import {LeadsService} from '../../services/leads.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {DialogData} from '../discount-dialog/discount-dialog.component';

export interface DialogData {
  payplansList: any;
}

@Component({
  selector: 'app-select-payplan-dialog',
  templateUrl: './select-payplan-dialog.component.html',
  styleUrls: ['./select-payplan-dialog.component.scss']
})
export class SelectPayplanDialogComponent implements OnInit {

  payPlansList;
  optyId;
  selectedPayplan: any = {};

  constructor(private leadsService: LeadsService,
              private dialogRef: MatDialogRef<SelectPayplanDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit() {
    this.payPlansList = this.data['payplansList'];
    this.optyId = this.data['optyId'];
  }

  selected() {
    const updatingOpportuityData = {
      // OptyId: this.optyId,
      id: this.selectedPayplan.Id,
      name: this.selectedPayplan.RecordName
    };
    return updatingOpportuityData;
  }
}
