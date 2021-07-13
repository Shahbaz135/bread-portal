import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { LogisticsService } from '../logistics.service';

@Component({
  selector: 'app-order-supplier',
  templateUrl: './order-supplier.component.html',
  styleUrls: ['./order-supplier.component.scss']
})
export class OrderSupplierComponent implements OnInit {
  orderSupplier = {
    fromDate: ``,
    toDate: ``
  };

  allOrderSuppliers = [];
  public loadingText = ``;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private logisticsService: LogisticsService
  ) { }

  ngOnInit(): void {
  }

  getSupplierOrders() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.orderSupplier.fromDate && this.orderSupplier.toDate) {
      this._getSupplierOrders();
    } else {
      this.spinner.hide();
      this.helperService.alertFailure(`Please Select From Date & To Date`, `Invalid`);
    }
  }

  _getSupplierOrders() {
    const formData = this.orderSupplier;
    this.logisticsService.getOrderSupplier(formData)
      .subscribe((response) => {
        console.log(response);
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allOrderSuppliers = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  getPDF(order): void {
    console.log(order);
    this.spinner.show();
    const data = {
      date: order.date,
      day: order.day
    };

    this.logisticsService.getSupplierPDF(data);
    this.spinner.hide();
  }

}
