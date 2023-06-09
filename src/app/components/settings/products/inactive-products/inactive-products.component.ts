import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-inactive-products',
  templateUrl: './inactive-products.component.html',
  styleUrls: ['./inactive-products.component.scss']
})
export class InactiveProductsComponent implements OnInit {
  public loadingText = ``;

  allProducts = [];

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    const data = {
      isActive: false
    };

    this.settingService.getAllProduct(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allProducts = response.data;
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
