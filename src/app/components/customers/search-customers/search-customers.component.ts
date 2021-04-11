import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { DataService } from 'src/app/shared/services/data.service';
import { HelperService } from 'src/app/shared/services/helper.service';
import { CustomersService } from '../customers.service';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.scss']
})
export class SearchCustomersComponent implements OnInit {
  loadingText = ``;
  allCustomers = [];

  constructor(
    private dataService: DataService,
    private customerService: CustomersService,
    private helperService: HelperService,
    private spinner: NgxSpinnerService
  ) {
    this.dataService.currentMessage.subscribe((data: object) => {
      if (Object.keys(data).length > 0) {
        this.getCustomers(data);
      }
    })
  }

  ngOnInit(): void {
    this.getCustomers({})
  }

  getCustomers(data) {
    this.loadingText = `Fetching record, Please Wait ..`;
    this.spinner.show();

    const formData = data
    this.customerService.getAllCustomers(formData)
      .subscribe((response) => {
        this.spinner.hide();
        if (response.status === `Success`) {
          this.allCustomers = response.data;
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
