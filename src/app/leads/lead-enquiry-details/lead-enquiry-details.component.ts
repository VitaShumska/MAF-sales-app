import {Component, Input, OnInit} from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {BreadcrumbsService} from "../../services/breadcrumbs.service";

@Component({
  selector: 'app-lead-enquiry-details',
  templateUrl: './lead-enquiry-details.component.html',
  styleUrls: ['./lead-enquiry-details.component.scss']
})
export class LeadEnquiryDetailsComponent implements OnInit {

  @Input() leadDetails: any = {};

  displayedColumns = [
    {
      name: 'Lead Number',
      key: 'LeadNumber',
      sort: '',
      disableSort: false
    },
    {
      name: 'Primary Purchaser',
      key: 'PrimaryContactPartyName',
      sort: '',
      disableSort: false
    },
    {
      name: 'Secondary Purchaser',
      key: 'OwnerPartyName',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit/Type',
      key: 'MAF_Project_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Unit Number',
      key: 'MAF_ProductType_c',
      sort: '',
      disableSort: false
    },
    {
      name: 'Last Updater',
      key: 'LastUpdateDate',
      sort: '',
      disableSort: false
    },
    {
      name: 'Select',
      key: 'select',
      sort: '',
      disableSort: false
    },
  ];

  leadsListOriginal: any[] = [];
  leadsList: any[] = [];

  constructor(private apiService: ApiService,
              private router: Router,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar) {}

  ngOnInit() {
    this.getLeads(0, 5);
  }

  getLeads(offset, limit) {
    this.loadingSpinner.show();
    this.apiService.getLeads(offset, limit)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.leadsListOriginal  =  data['items'];
          this.leadsList = this.leadsListOriginal;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
