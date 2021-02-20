import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CustomizerService } from 'src/app/shared/services/customizer.service';
import { NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public toggle;

  constructor(
    public customize: CustomizerService, 
    public navService: NavService,
    private router: Router
  ) { }

  openToggle: boolean;

  receiveToggle($event) {
    this.openToggle = $event
    this.toggle = this.openToggle;
  }

  ngOnInit(): void {
    if (window.innerWidth < 1199) {
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.navService.closeSidebar = true;
          this.navService.sidebarToggle = false;
          const ele = document.getElementById("sidebar-toggle") as HTMLInputElement;
          ele.checked = false;
        }
      })
    }
  }

}
