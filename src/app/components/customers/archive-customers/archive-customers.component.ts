import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelperService } from 'src/app/shared/services/helper.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-archive-customers',
  templateUrl: './archive-customers.component.html',
  styleUrls: ['./archive-customers.component.scss']
})
export class ArchiveCustomersComponent implements OnInit {
  public loadingText = ``;
  public allCustomers = [];

  constructor(
    private helperService: HelperService,
    private spinner: NgxSpinnerService,
    private customerService: CustomersService,
  ) { }

  ngOnInit(): void {
    this.getALlCustomers();
  }

  getALlCustomers() {
    this.loadingText = `Fetching records, please wait...`;
    this.spinner.show();
    const data = {
      isArchive: true
    };

    this.customerService.getAllCustomers(data)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allCustomers = response.data;
        }
      }, (error) => {
        this.spinner.hide();
        console.log(error);
        if (error.error.message) {
          this.helperService.alertFailure(error.error.message[0].message, `Error`);
        } else {
          this.helperService.alertFailure(`Something went wrong, Please try again`, `Error`);
        }
      });
  }

}
