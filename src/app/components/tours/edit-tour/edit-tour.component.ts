import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'src/app/shared/services/common/auth.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { TourService } from '../tour.service';

@Component({
  selector: 'app-edit-tour',
  templateUrl: './edit-tour.component.html',
  styleUrls: ['./edit-tour.component.scss']
})
export class EditTourComponent implements OnInit {
  public tourForm: FormGroup;

  public loadingText = ``;

  allUsers = [];
  weekDays = [];
  userIds = [];

  tourId:number;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private tourService: TourService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    this.renderForm();
    this.getUsers();

    this.route.params.subscribe(params => {
      if (params[`id`]) {
        this.tourId = +params[`id`];
      }
    })
  }

  ngOnInit(): void {
    this.getTourData();
  }

  getTourData() {
    this.spinner.show();
    this.loadingText = `Fetching record, Please wait...`;
    const data = {id: this.tourId};

    this.tourService.getAll(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          const tourData = response.data[0];
          this.populateForm(tourData);
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

  populateForm(data) {
    if (data) {
      this.weekDays = data.tourDays.map(x => x.id);
      this.userIds = data.tourUsers.map(x => x.id);

      this.tourForm.controls[`description`].setValue(data.description);
      this.tourForm.controls[`name`].setValue(data.name);
      this.tourForm.controls[`label`].setValue(data.label);
      this.tourForm.controls[`billingMode`].setValue(data.billingMode);
      this.tourForm.controls[`fieldTour`].setValue(data.fieldTour);
      this.tourForm.controls[`supportTour`].setValue(data.supportTour);
    }
  }

  getUsers() {
    this.spinner.show();
    this.loadingText = `Fetching record, Please wait...`;
    this.tourService.getAllUsers()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allUsers = response.data.records;
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
      label: ['', [Validators.required]],
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

  checkWeekDays(ids) {
    return this.weekDays.filter(x => ids === x).length;
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

    this.tourService.edit(formData, this.tourId)
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
    return this.cf.description.hasError('required') ? 'Postal Code is required':
      '';
  }

  // tslint:disable-next-line: typedef
  nameError() {
    return this.cf.name.hasError('required') ? 'Name is required' :
        '';
  }

}
