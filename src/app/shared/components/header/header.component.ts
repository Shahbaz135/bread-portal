import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { CustomizerService } from '../../services/customizer.service';

var body = document.getElementsByTagName("body")[0];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public menuItems: Menu[];
  public items: Menu[];
  public text: string;
  public openNav: boolean = false;
  public open: boolean = false;
  public openSearch

  @Output() rightSidebarEvent = new EventEmitter<boolean>();
 
  constructor(public navServices: NavService, public customize: CustomizerService) {
  }

  ngOnInit() {
    this.navServices.items.subscribe(menuItems => {
      this.items = menuItems
    });
  }

  openHeaderMenu() {
    this.open = !this.open;
  }

  openMobileNav() {
    this.openNav = !this.openNav;
  }

 
  switchToggle() {
    this.navServices.sidebarToggle = this.navServices.closeSidebar ? false : true;
    this.navServices.closeSidebar = !this.navServices.closeSidebar;
  }
}
