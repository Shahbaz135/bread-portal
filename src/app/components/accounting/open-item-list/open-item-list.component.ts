import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { CustomersService } from '../../customers/customers.service';
import { AccountingService } from '../accounting.service';

@Component({
  selector: 'app-open-item-list',
  templateUrl: './open-item-list.component.html',
  styleUrls: ['./open-item-list.component.scss']
})
export class OpenItemListComponent implements OnInit {
  allInvoices = []
  loadingText: string;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private accountingService: AccountingService,
    private customerService: CustomersService,
  ) { }

  ngOnInit(): void {
    this.getInvoices();
  }

  getInvoices() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    const data = {
      status: 'unpaid'
    }
    this.accountingService.getInvoices(data).subscribe(
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

  getPDF(invoice): void {
    this.spinner.show();
    const data = {
      id: invoice.id
    };
    this.customerService.getInvoicePDF(data);
    this.spinner.hide();
  }

  updateStatus(invoice) {
    const data = {
      status: 'paid'
    }
    const id = invoice.id;
    this.accountingService.updateInvoiceStatus(data, id)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.getInvoices();
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      })
  }

  sendEmail(invoice) {
    this.loadingText = `Processing, please wait...`;
    this.spinner.show();
    const data = {
      id: invoice.id,
      invoiceNumber: invoice.invoiceNumber,
      name: invoice.CustomerInvoice.fName + ' ' + invoice.CustomerInvoice.lName,
      email: invoice.CustomerInvoice.email
    }
    this.accountingService.sendEmail(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      })
  }

}
