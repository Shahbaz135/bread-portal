import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { NavService, Menu } from '../../services/nav.service';
import { CustomizerService } from '../../services/customizer.service';
import { AuthService } from '../../services/common/auth.service';
import { Router } from '@angular/router';

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

  // Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
    if (window.innerWidth < 1000) {
      this.navServices.closeSidebar = true;
      this.navServices.sidebarToggle = false;
    } else {
      this.navServices.closeSidebar = false;
      this.navServices.sidebarToggle = true;
    }
	}

 
  constructor(
    public navServices: NavService,
    public customize: CustomizerService,
    private router: Router
    ) {
    // this.onResize();
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

  logOut() {
    AuthService.removeLoggedUser();
    this.router.navigateByUrl(`auth/login`);
  }
}
