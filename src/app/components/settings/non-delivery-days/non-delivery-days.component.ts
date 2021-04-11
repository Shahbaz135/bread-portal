import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../settings/setting.service';


@Component({
  selector: 'app-non-delivery-days',
  templateUrl: './non-delivery-days.component.html',
  styleUrls: ['./non-delivery-days.component.scss']
})
export class NonDeliveryDaysComponent implements OnInit {
  public loadingText = ``;

  nonDeliveryDay = {
    day: null,
    showOnCustomerPortal: true
  }

  allDays = [];

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
  ) { }

  ngOnInit(): void {
    this.getData();
  }

  submit() {
    if (!this.nonDeliveryDay.day) {
      this.helperService.alertFailure(`Please Fill all required fields`, `Invalid`);
    } else {
      this._submit();
    }
  }

  _submit() {
    this.loadingText = `Submitting records, please wait...`;
    this.spinner.show();
    const data = this.nonDeliveryDay;
    this.settingService.addNonDeliveryDay(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.helperService.alertSuccess(response.message, response.status);
          this.getData();
          this.nonDeliveryDay.day = null;
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

  getData() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();

    this.settingService.getNonDeliveryDay()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allDays = response.data;
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

  deleteArea(area) {
    ///// conform here first
    const confirmation = this.helperService.ConfirmationAlert;
    confirmation.fire({
      text: `This Date will be deleted..`,
      title: `Are you sure?`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Deleting record, please wait..`;
          this.spinner.show();
          this.settingService.deleteNonDeliveryDay(area.id)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                this.getData();
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
      })
      .catch(error => {
        console.log(error);
        // this.s
      })
  }

}
