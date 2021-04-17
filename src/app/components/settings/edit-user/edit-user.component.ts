import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  public loadingText = ``;
  userId;
  allRoles = [];

  public user = {
    fName: null,
    lName: null,
    email: null,
    password: null,
    isReceiveEmail: true,
    RoleId: null
  };

  constructor(
    private settingService: SettingService,
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      if (params[`id`]) {
        this.userId = params[`id`];
        this.getRoles();
        this.getUserData();
      }
    })
  }

  ngOnInit(): void {
  }

  getRoles() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    this.settingService.getAllRoles()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allRoles = response.data;
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

  getUserData() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    const data = {
      id: this.userId
    };

    this.settingService.getUsers(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.setData(response.data.data[0]);
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
      this.user.fName = data.fName;
      this.user.lName = data.lName;
      this.user.email = data.email;
      this.user.RoleId = data.RoleId;
      this.user.password = data.password;
      this.user.isReceiveEmail = data.isReceiveEmail;
    }
  }

  submit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (!this.user.fName || !this.user.lName|| !this.user.email
        || !this.user.RoleId
      ) {
      this.spinner.hide();
      this.helperService.alertFailure(`Please Fill All Required Fields`, `Invalid`);
      return;
    } else {
        this._submit();
    }
  }

  _submit() {
    const formData: any = this.user;

    this.settingService.updateUser(formData, this.userId)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.helperService.navigate(`/settings/users`)
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
