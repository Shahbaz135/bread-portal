import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { HelperService } from "src/app/shared/services/helper.service";
import { TourService } from "../../tours/tour.service";
import { LogisticsService } from "../logistics.service";

@Component({
  selector: "app-delivery-list",
  templateUrl: "./delivery-list.component.html",
  styleUrls: ["./delivery-list.component.scss"],
})
export class DeliveryListComponent implements OnInit {
  allTours = [];
  loadingText: string;

  deliveryList = {
    tour: ``,
    date: ``,
  };

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private tourService: TourService,
    private logisticsService: LogisticsService
  ) {}

  ngOnInit(): void {
    this.getALlTours();
  }

  getALlTours() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    this.tourService.getAll().subscribe(
      (response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allTours = response.data;
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

  getDeliveryList() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.deliveryList.date && this.deliveryList.tour) {
      this._getDeliveryList();
    } else {
      this.spinner.hide();
      this.helperService.alertFailure(`Please Select Date & Tour`, `Invalid`);
    }
  }

  _getDeliveryList() {
    const formData = this.deliveryList;
    this.spinner.hide();
    this.logisticsService.getDeliveryPDF(formData);
    // this.logisticsService.getOrderSupplier(formData)
    //   .subscribe((response) => {
    //     this.spinner.hide();
    //     if (response.status === `Success`) {
    //       this.allOrderSuppliers = response.data;
    //     }
    //   }, (error) => {
    //     this.spinner.hide();
    //     console.log(error);
    //     if (error.error) {
    //       this.helperService.alertFailure(error.error.message[0].message, `Error`);
    //     } else {
    //       this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
    //     }
    //   });
  }
}
