import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { FranchiseService } from '../franchise.service';

@Component({
  selector: 'app-all-franchises',
  templateUrl: './all-franchises.component.html',
  styleUrls: ['./all-franchises.component.scss']
})
export class AllFranchisesComponent implements OnInit {
  allFranchises = [];

  public loadingText = ``;

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private partnerService: FranchiseService,
  ) { }

  ngOnInit(): void {
    this.getAllFranchises();
  }

  getAllFranchises() {
    this.loadingText = `Fetching records, Please Wait...`;
    this.spinner.show();

    this.partnerService.getAll()
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allFranchises = response.data;
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
