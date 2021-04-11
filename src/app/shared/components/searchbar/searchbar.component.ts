import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {
  public customer = {
    fName: ``,
    lName: ``,
    postalCode: ``,
    town: ``,
    phone: ``,
    email: ``,
    code: ``,
    id: ``,
    houseStreetNumber: ``
  }

  constructor(
    private dataService: DataService
  ) {
  }

  ngOnInit(): void {
  }

  searchCustomer() {
    const data: any = {};
    for (const item in this.customer) {
      if (this.customer[item] !== ``) {
        data[item] = this.customer[item];
      }
    };

    this.dataService.changeMessage(data);
  }

}
