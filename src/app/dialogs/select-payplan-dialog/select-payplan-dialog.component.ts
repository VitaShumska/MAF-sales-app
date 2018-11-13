import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-payplan-dialog',
  templateUrl: './select-payplan-dialog.component.html',
  styleUrls: ['./select-payplan-dialog.component.scss']
})
export class SelectPayplanDialogComponent implements OnInit {

  payplansList: any[] = [
    {
      payplan: 'Lillac PP1'
    },
    {
      payplan: 'Lillac PP2'
    },
    {
      payplan: 'Lillac PP3'
    },
    {
      payplan: 'Lillac PP4'
    },
    {
      payplan: 'Lillac PP5'
    },
    {
      payplan: 'Lillac PP6'
    }
  ];

  selectedPayplan;

  constructor() { }

  ngOnInit() {
  }

  selected() {
    console.log('selected payplan', this.selectedPayplan);
  }
}
