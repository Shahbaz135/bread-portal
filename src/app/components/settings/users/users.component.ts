import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { SettingService } from '../setting.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public loadingText = ``;
  active = 1;

  public user = {
    fName: null,
    lName: null,
    email: null,
    password: null,
    isReceiveEmail: true,
    RoleId: null
  };

  allRoles = [];
  allUsers = [];

  constructor(
    private settingService: SettingService,
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
  ) { }

  ngOnInit(): void {
    this.getUsers();
    this.getRoles();
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

  getUsers() {
    this.loadingText = `fetching record, please wait..`;
    this.spinner.show();
    this.settingService.getUsers()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allUsers = response.data.data;
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

  submit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (!this.user.fName || !this.user.lName|| !this.user.email
        || !this.user.password || !this.user.RoleId
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

    this.settingService.createUser(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.getUsers();
          this.active = 1
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

  deleteUser(user) {
    ///// conform here first
    const confirmation = this.helperService.ConfirmationAlert;
    confirmation.fire({
      text: `This User will be permanently deleted..`,
      title: `Are you sure?`
    })
      .then(res => {
        if (res.isConfirmed) {
          this.loadingText = `Deleting record, please wait..`;
          this.spinner.show();
          this.settingService.deleteUser(user.id)
            .subscribe((response) => {
              this.spinner.hide();
              if (response.status === `Success`) {
                this.helperService.alertSuccess(response.message, response.status);
                this.getUsers();
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
