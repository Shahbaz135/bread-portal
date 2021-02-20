import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-customers',
  templateUrl: './search-customers.component.html',
  styleUrls: ['./search-customers.component.scss']
})
export class SearchCustomersComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    console.log(`Search Customers Works....`)
  }

}
