import { Component, OnInit } from '@angular/core';
import {LoadingSpinnerService} from '../../services/loading-spinner.service';

@Component({
  selector: 'app-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  statusSpinner = false;

  constructor(private loadingSpinnerService: LoadingSpinnerService) {
    this.loadingSpinnerService.spinnerStatus.subscribe(status =>
      this.toggleSpinner(status));
  }

  ngOnInit () {}

  toggleSpinner(status) {
    this.statusSpinner = status;
  }

}
