import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LeadsService } from '../../services/leads.service';
import { PropertiesService } from '../../services/properties.service';
import { LoadingSpinnerService } from '../../services/loading-spinner.service';
import { MatSnackBar } from '@angular/material';
import { MockUpService } from '../../services/mock-up.service';

@Component({
  selector: 'app-generate-quote',
  templateUrl: './generate-quote.component.html',
  styleUrls: ['./generate-quote.component.scss']
})
export class GenerateQuoteComponent implements OnInit {
  sub;
  contactId;
  optyNumber;
  contactDetails = {};
  milestonesData = [];
  optyDetails;
  unitDetails;

  constructor(private elRef: ElementRef,
              private route: ActivatedRoute,
              private leadsService: LeadsService,
              private mockUpService: MockUpService,
              private propertiesService: PropertiesService,
              private loadingSpinner: LoadingSpinnerService,
              public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.contactId = params['contactId'];
      this.optyNumber = params['optyId'];
      this.getOpportunityById(this.optyNumber);
      this.getContactById(this.contactId);
    });
  }

  getContactById (id) {
    this.loadingSpinner.show();
    this.leadsService.getContactById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.contactDetails = data.items[0];
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getOpportunityById(id) {
    this.loadingSpinner.show();
    this.leadsService.getOpportunityById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.optyDetails = data;
          this.getMilestones(this.optyDetails.OptyId);
          // this.getReceipt(this.optyDetails.OptyId);
          this.getPropertiesById(this.optyDetails.MAF_Product_Id_c);
          if (this.optyDetails.OptyNumber = this.mockUpService.currentOpt.OptyNumber) {
            this.optyDetails = this.mockUpService.currentOpt;
          }
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  getMilestones(id) {
    this.loadingSpinner.show();
    this.leadsService.getMilestones(id)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          this.milestonesData = data.items;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getReceipt(id) {
    this.loadingSpinner.show();
    this.leadsService.getReceipt(id)
      .subscribe(
        (data: any) => {
          this.loadingSpinner.hide();
          // this.getMilestonesData = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        }
      );
  }

  getPropertiesById(id) {
    this.loadingSpinner.show();
    this.propertiesService.getPropertiesById(id)
      .subscribe(data => {
          this.loadingSpinner.hide();
          this.unitDetails = data;
        },
        (error) => {
          this.loadingSpinner.hide();
          this.openSnackBar('Server error', 'OK');
        });
  }

  print(): void {
    let printContents, popupWin;
    printContents = this.elRef.nativeElement.querySelector('.quote-content');
    printContents = printContents.innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto');
    popupWin.document.open();
    popupWin.document.write(`
      <html>
        <head>
          <style>
            .general-info {
              font-size: 17px;
            }
            .title-block {
              text-align: center;
              height: 33px;
              line-height: 33px;
              background-color: #f89716;
              color: #fff;
              font-family: Helvetica;
              font-size: 17px;
              margin: 0 -25px;
            }
            .space-between {
              display: flex;
              justify-content: space-between;
            }
            .table {
              margin-bottom: 20px;
              font-size: 12px;
            }
            .table-cell {
              flex: 1;
              height: 60px;
              line-height: 60px;
              vertical-align: middle;
            }
            .table-cell .unit-name {
              flex: 1.5;
              display: flex;
              margin: 7px 0;
              padding-left: 15px;
            }
            .unit-img {
              display: none;
            }
            .unit-name div {
              height: 46px;
            }
            .unit-name p {
              line-height: 46px;
              margin: 0;
            }
            .table-header {
              display: flex;
            }
            .properties-table .table-header .table-cell:first-child {
              flex: 1.5;
              padding-left: 15px;
            }
            .table-row {
              display: flex;
              height: 60px;
            }
            .description {
              margin-bottom: 20px;
            }
          </style>
        </head>
    <body onload="window.print();window.close()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
