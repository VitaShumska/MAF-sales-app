import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-discount-dialog',
  templateUrl: './discount-dialog.component.html',
  styleUrls: ['./discount-dialog.component.scss']
})
export class DiscountDialogComponent implements OnInit {
  unitTypes: any = [];
  newDiscount ={
    'type': '',
    'amount': '',
    'discount': ''
  };

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.getDropdownOptions('MAF_PROD_UNIT_TYPE');
  }

  getDropdownOptions(param) {
    this.apiService.getDropdownOption(param).subscribe(
      (data:  any) => {
        data.items.map((item) => {
          this.unitTypes.push(item.LookupCode);
        });
      }
    );
  }

  selected() {
    console.log('selected discount');
  }
}
