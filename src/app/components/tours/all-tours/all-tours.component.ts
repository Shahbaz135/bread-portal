import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-tours',
  templateUrl: './all-tours.component.html',
  styleUrls: ['./all-tours.component.scss']
})
export class AllToursComponent implements OnInit {
  active = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
