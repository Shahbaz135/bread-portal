import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-categories-overview',
  templateUrl: './categories-overview.component.html',
  styleUrls: ['./categories-overview.component.scss']
})
export class CategoriesOverviewComponent implements OnInit {
  public loadingText = ``;

  allCategories = [];

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    this.settingService.getAllCategories()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allCategories = response.data;
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

  deleteCategory(category) {
    ///// conform here first
    const confirmation = this.helperService.ConfirmationAlert;
    confirmation.fire({
      text: `This Category will be removed..`,
      title: `Are you sure?`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Deleting record, please wait..`;
          this.spinner.show();
          this.settingService.deleteCategory(category.id)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                this.getCategories();
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
