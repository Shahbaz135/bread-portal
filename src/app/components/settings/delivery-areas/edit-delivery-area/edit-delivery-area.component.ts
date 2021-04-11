import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-edit-delivery-area',
  templateUrl: './edit-delivery-area.component.html',
  styleUrls: ['./edit-delivery-area.component.scss']
})
export class EditDeliveryAreaComponent implements OnInit {
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

  areaId;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      if (params[`id`]) {
        this.areaId = params[`id`];
      }
    })
  }

  ngOnInit(): void {
    this.getDeliveryAreas();
  }

  getDeliveryAreas() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    const data = {
      id: this.areaId
    }

    this.settingService.getDeliveryArea(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.setData(response.data[0]);
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

  setData(data) {
    if (data) {
      this.deliveryArea.description = data.description;
      this.deliveryArea.postCode = data.postCode;
      this.deliveryArea.state = data.state;
      this.deliveryArea.regularReference = data.orderReferenceRegular;
      this.deliveryArea.trailInformation = data.orderReferenceTrail;

      const regularIds = data.regularDeliveryDay.map(x => x.id);
      const sampleIds = data.sampleDeliveryDay.map(x => x.id);

      this.deliveryArea.regularDeliveryDays = regularIds;
      this.deliveryArea.sampleDeliveryDays = sampleIds;
    }
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

  checkRegularWeekDays(ids) {
    return this.deliveryArea.regularDeliveryDays.filter(x => ids === x).length;
  }

  checkSampleWeekDays(ids) {
    return this.deliveryArea.sampleDeliveryDays.filter(x => ids === x).length;
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
    this.loadingText = `Updating records, please wait...`;
    this.spinner.show();
    const data = this.deliveryArea;
    this.settingService.updateDeliveryArea(data, this.areaId)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.helperService.alertSuccess(response.message, response.status);
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
