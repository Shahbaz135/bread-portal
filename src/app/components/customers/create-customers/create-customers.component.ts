import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/shared/services/helper.service';

@Component({
  selector: 'app-create-customers',
  templateUrl: './create-customers.component.html',
  styleUrls: ['./create-customers.component.scss']
})
export class CreateCustomersComponent implements OnInit {

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
  }

}
