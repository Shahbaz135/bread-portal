import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../../setting.service';

@Component({
  selector: 'app-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {
  public loadingText = ``;

  private categoryId;

  category = {
    name: ``
  };

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private settingService: SettingService,
    private route: ActivatedRoute
  ) {
    this.route.params.subscribe(params => {
      if (params[`id`]) {
        this.categoryId = params[`id`];
        this.getData();
      }
    })
  }

  ngOnInit(): void {
  }

  getData() {
    this.loadingText = `Fetching details, please wait..`;
    this.spinner.show();

    const formData = {
      id: this.categoryId
    }
    this.settingService.getAllCategories(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.setFields(response.data[0]);
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

  setFields(data) {
    if (data) {
      this.category.name = data.title;
    }
  }

  submit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (!this.category.name || this.category.name === ``) {
      this.spinner.hide();
      this.helperService.alertFailure(`Please Name First`, `Invalid`);
      return;
    } else {
      if (this.categoryId) {
        this._update()
      } else {
        this._submit();
      }
    }
  }

  _submit() {
    const userInfo = AuthService.getLoggedUser().data;
    const formData: any = this.category;
    formData.userId = userInfo.id;
    this.settingService.createCategory(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          // this.franchiseForm.reset();
          this.helperService.navigate(`settings/categories/categories-overview`);
          // this.router.navigateByUrl(`auth/login`);
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

  _update() {
    const formData: any = this.category;
    this.settingService.editCategory(formData, this.categoryId)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          // this.franchiseForm.reset();
          this.helperService.navigate(`settings/categories/categories-overview`);
          // this.router.navigateByUrl(`auth/login`);
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
