import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-active-products',
  templateUrl: './active-products.component.html',
  styleUrls: ['./active-products.component.scss']
})
export class ActiveProductsComponent implements OnInit {
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
      isActive: true
    };

    this.settingService.getAllProduct(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          console.log(response);
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
