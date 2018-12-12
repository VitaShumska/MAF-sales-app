import { Component, OnInit, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-generate-quote',
  templateUrl: './generate-quote.component.html',
  styleUrls: ['./generate-quote.component.scss']
})
export class GenerateQuoteComponent implements OnInit {

  constructor(private elRef: ElementRef) { }

  ngOnInit() {
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

}
