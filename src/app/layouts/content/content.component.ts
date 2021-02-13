import { Component, OnInit, Input } from '@angular/core';
import { CustomizerService } from '../../shared/services/customizer.service'
import { NavService } from '../../shared/services/nav.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {
  public toggle;

  constructor(public customize: CustomizerService, 
    public navService: NavService, private router: Router) {
    
  }
  openToggle: boolean;

  receiveToggle($event) {
    this.openToggle = $event
    this.toggle = this.openToggle;
  }

  ngOnInit() {
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
