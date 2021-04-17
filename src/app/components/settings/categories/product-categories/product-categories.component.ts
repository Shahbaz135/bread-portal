import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { environment } from 'src/environments/environment';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-product-categories',
  templateUrl: './product-categories.component.html',
  styleUrls: ['./product-categories.component.scss']
})
export class ProductCategoriesComponent implements OnInit {
  public loadingText = ``;

  categoryData: any = {};

  constructor(
    private route: ActivatedRoute,
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService
  ) {
    this.route.params.subscribe(params => {
      if (params[`id`]) {
        const id = params[`id`];
        this.getCategory(id);
      }
    })
  }

  ngOnInit(): void {
  }

  getCategory(id) {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    const formData = {
      id
    };

    this.settingService.getAllCategories(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.categoryData = response.data[0];
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

  absPath(file) {
    return environment.fileBaseUrl + file;
  }

}
