import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.scss']
})
export class CreateTourComponent implements OnInit {
  public tourForm: FormGroup;

  public loadingText = ``;

  allUsers = [];
  weekDays = [];
  userIds = [];


  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private tourService: TourService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.renderForm();
    this.getUsers();
  }

  getUsers() {
    this.spinner.show();
    this.loadingText = `Fetching record, Please wait...`;
    this.tourService.getAllUsers()
      .subscribe((response) => {
        this.allUsers = response.data.records;
        this.spinner.hide();
        if (response.status === `Success`) {
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

  //// initializing form
  renderForm(): void {
    this.tourForm = this.formBuilder.group({
      description: ['', [Validators.required]],
      label: [''],
      name: ['', [Validators.required ]],
      billingMode: [''],
      fieldTour: [false],
      supportTour: [false]
    });
  }

  onCheckUser(checked, user) {
    if (checked) {
      this.userIds.push(user.id);
    } else {
      const index = this.userIds.findIndex(x => x === user.id);
      if (index > -1) {
        this.userIds.splice(index, 1);
      }
    }
  }

  check(id) {
    return this.userIds.filter(x => id === x).length;
  }

  onCheckAll(checked) {
    if (checked) {
      this.userIds = this.allUsers.map(x => x.id);
    } else {
      this.userIds = [];
    }
  }

  onAddWeekDays(checked, day) {
    if (checked) {
      if (day === `Saturday`) {
        this.weekDays.push(6);
      } else if (day === `Sunday`) {
        this.weekDays.push(7);
      } else if (day === `WorkingDays`) {
        this.weekDays = this.weekDays.concat([1,2,3,4,5]);
      }
    } else {
      let ids = [];
      if (day === `Saturday`) {
        ids.push(6);
      } else if (day === `Sunday`) {
        ids.push(7);
      } else if (day === `WorkingDays`) {
        ids = ids.concat([1,2,3,4,5]);
      }

      // tslint:disable-next-line: prefer-for-of
      for(let i = 0; i < ids.length; i++) {
        const index = this.weekDays.findIndex(x => x === ids[i]);
        if (index > -1) {
          this.weekDays.splice(index, 1);
        }
      }
    }
  }

  submit() {
    this.loadingText = `Submitting Form, Please Wait ..`;
    this.spinner.show();
    if (this.tourForm.invalid) {
      this.tourForm.markAllAsTouched();
      this.spinner.hide();
      this.helperService.alertFailure(`Please Fill all required fields`, `Invalid`);
      return;
    } else {
      this._submit();
    }
  }

  _submit() {
    const userId = AuthService.getLoggedUser().data.id;

    const formData = this.tourForm.value;
    formData.userIds = this.userIds;
    formData.weekDayIds = this.weekDays;
    formData.userId = userId;

    this.tourService.create(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          // console.log(response);
          this.helperService.alertSuccess(response.message, response.status);
          this.helperService.navigate(`tours/all-tours`);
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

  // convenience getter for easy access to registration form fields
  get cf() {
    return this.tourForm.controls;
  }


  ///////// ************ validation of form *********** ///////////
  // tslint:disable-next-line: typedef
  descriptionError() {
    return this.cf.description.hasError('required') ? 'Description is required':
      '';
  }

  // tslint:disable-next-line: typedef
  nameError() {
    return this.cf.name.hasError('required') ? 'Name is required' :
        '';
  }

}
