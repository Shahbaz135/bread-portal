import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { CustomersService } from '../../customers/customers.service';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.scss']
})
export class AllToursComponent implements OnInit {
  active = 1;

  public loadingText = ``;

  public allTours = [];
  public workingDayTour = [];
  public saturdayTour = [];
  public sundayTour = [];

  private selectedDay = `tourWeekDays`;
  public tourId;
  public allCustomers = [];

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private tourService: TourService,
    private customerService: CustomersService
  ) { }

  ngOnInit(): void {
    this.getWorkingDayTours();
    this.getSaturdayTours();
    this.getSundayTours();
    this.getALlTours();
  }

  getALlTours() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    this.tourService.getAll()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allTours = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  deleteTour(id) {
    ///// conform here first
    const confirmation = this.helperService.ConfirmationAlert;
    confirmation.fire({
      text: `This tour will be removed..`,
      title: `Are you sure?`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Deleting record, please wait...`;
          this.spinner.show();
          this.tourService.delete(id)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                this.getALlTours();
              }
            }, (error) => {
              this.spinner.hide();
              console.log(error);
              if (error.error.message) {
                this.helperService.alertFailure(error.error.message[0].message, `Error`);
              } else {
                this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
              }
            });
        }
      });
  }

  getWorkingDayTours() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();

    const data = {
      weekDayIds: [1,2,3,4,5]
    };

    this.tourService.getAll(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.workingDayTour = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  getSaturdayTours() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();

    const data = {
      weekDayIds: [6]
    };

    this.tourService.getAll(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.saturdayTour = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  getSundayTours() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();

    const data = {
      weekDayIds: [7]
    };

    this.tourService.getAll(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.sundayTour = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

  selectedTab(day) {
    if (day && day !== ``) {
      this.selectedDay = day;
    }
    this.tourId = null;
    this.allCustomers = [];
  }

  getCustomers() {
    if (!this.tourId) {
      this.helperService.alertFailure(`Please Select Tour`, `Error`);
    } else {
      this._getCustomers();
    }
  }

  _getCustomers() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();

    const selected = this.selectedDay;
    const data = {};
    data[selected] = this.tourId;

    this.customerService.getAllCustomers(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allCustomers = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

}
