import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-serial-mails',
  templateUrl: './serial-mails.component.html',
  styleUrls: ['./serial-mails.component.scss']
})
export class SerialMailsComponent implements OnInit {
  active = 1;

  constructor() { }

  ngOnInit(): void {
  }

}
