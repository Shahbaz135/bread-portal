import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
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


  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private tourService: TourService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
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
        console.log(response);
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
      label: ['', [Validators.required]],
      name: ['', [Validators.required ]],
      billingMode: [''],
      weekDays: [''],
      userIds: [''],
      fieldTour: [false],
      supportTour: [false]
    });
  }

}
