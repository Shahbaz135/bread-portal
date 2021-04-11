import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-add-delivery-area',
  templateUrl: './add-delivery-area.component.html',
  styleUrls: ['./add-delivery-area.component.scss']
})
export class AddDeliveryAreaComponent implements OnInit {
  public loadingText = ``;

  isSubmitted = false;

  deliveryArea = {
    postCode: null,
    description: null,
    state: null,
    regularReference: null,
    trailInformation: null,
    regularDeliveryDays: [],
    sampleDeliveryDays: []
  }

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
  ) { }

  ngOnInit(): void {
  }

  onAddRegularWeekDays(checked, day) {
    if (checked) {
      this.deliveryArea.regularDeliveryDays.push(day);
    } else {
      // tslint:disable-next-line: prefer-for-of
      const index = this.deliveryArea.regularDeliveryDays.findIndex(x => x === day);
      if (index > -1) {
        this.deliveryArea.regularDeliveryDays.splice(index, 1);
      }
    }
  }

  onAddSampleWeekDays(checked, day) {
    if (checked) {
      this.deliveryArea.sampleDeliveryDays.push(day);
    } else {
      // tslint:disable-next-line: prefer-for-of
      const index = this.deliveryArea.sampleDeliveryDays.findIndex(x => x === day);
      if (index > -1) {
        this.deliveryArea.sampleDeliveryDays.splice(index, 1);
      }
    }
  }

  submit() {
    this.isSubmitted = true;
    if (!this.deliveryArea.postCode || this.deliveryArea.postCode.length !== 5 || !this.deliveryArea.state) {
        this.helperService.alertFailure(`Please Fill all required fields`, `Invalid`);
    } else if (this.deliveryArea.regularDeliveryDays.length < 1 || this.deliveryArea.sampleDeliveryDays.length < 1){
      this.helperService.alertFailure(`Please select delivery days`, `Invalid`);
    } else {
      this._submit();
    }
  }

  _submit() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    const data = this.deliveryArea;
    this.settingService.addDeliveryArea(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.helperService.navigate(`settings/delivery-areas/delivery-areas-overview`);
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

}
