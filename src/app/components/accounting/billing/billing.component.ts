import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.scss']
})
export class BillingComponent implements OnInit {
  allInvoices = []
  loadingText: string;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private accountingService: AccountingService
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    const data = {
    }
    this.accountingService.getInvoicesForBilling(data).subscribe(
      (response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allInvoices = response.data;
          console.log(this.allInvoices);
        }
      },
      (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(
            error.error.message[0].message,
            `Error`
          );
        } else {
          this.helperService.alertFailure(
            `Something went wrong, Please try again`,
            `Error`
          );
        }
      }
    );
  }

  generateXML(invoice) {
    console.log(invoice);
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    const data = {
      dateFrom: invoice.dateFrom,
      dateTo: invoice.dateTo
    }

    this.accountingService.generateXML(data);
    this.spinner.hide()
    // this.accountingService.generateXML(data).subscribe(
    //   (response) => {
    //     this.spinner.hide();
    //     if (response.status === `Success`) {
    //       // this.allInvoices = response.data;
    //       // console.log(this.allInvoices);
    //     }
    //   },
    //   (error) => {
    //     this.spinner.hide();
    //     console.log(error);
    //     if (error.error.message) {
    //       this.helperService.alertFailure(
    //         error.error.message[0].message,
    //         `Error`
    //       );
    //     } else {
    //       this.helperService.alertFailure(
    //         `Something went wrong, Please try again`,
    //         `Error`
    //       );
    //     }
    //   }
    // );
  }

}
