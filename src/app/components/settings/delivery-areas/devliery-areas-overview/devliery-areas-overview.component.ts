import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-devliery-areas-overview',
  templateUrl: './devliery-areas-overview.component.html',
  styleUrls: ['./devliery-areas-overview.component.scss']
})
export class DevlieryAreasOverviewComponent implements OnInit {

  public loadingText = ``;

  allAreas = [];

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.getDeliveryAreas();
  }

  getDeliveryAreas() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();

    this.settingService.getDeliveryArea()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allAreas = response.data;
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
      text: `This Delivery will be deleted..`,
      title: `Are you sure?`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Deleting record, please wait..`;
          this.spinner.show();
          this.settingService.deleteDeliveryArea(area.id)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                this.getDeliveryAreas();
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
