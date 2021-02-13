import { Injectable, HostListener } from '@angular/core';
import { BehaviorSubject, Observable, Subscriber } from 'rxjs';

// Menu
export interface Menu {
	path?: string;
	title?: string;
	icon?: string;
	type?: string;
	badgeType?: string;
	badgeValue?: string;
	active?: boolean;
	bookmark?: boolean;
	children?: Menu[];
}

@Injectable({
	providedIn: 'root'
})

export class NavService {


	public screenWidth: any;
	public closeSidebar: boolean = false;
	public sidebarToggle: boolean = true;

	constructor() {
	  this.onResize();
	  if (this.screenWidth < 1199) {
		this.closeSidebar = true;
		this.sidebarToggle = false;
	  }
	}


	// Windows width
	@HostListener('window:resize', ['$event'])
	onResize(event?) {
	  this.screenWidth = window.innerWidth;
	}

	// tslint:disable-next-line: member-ordering
	MENUITEMS: Menu[] = [
		{
			path: '/sample/sample-component', title: 'Sample Components', icon: 'headphones', active: true, type: 'link'
		},
		{
			path: '/dashboard', title: 'Dashboard', icon: 'headphones', active: true, type: 'link'
		},
		{
			path: '/customers', title: 'Customers', icon: 'headphones', active: true, type: 'link'
		},
		{
			title: 'Logistics', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/logistics/order-supplier', title: 'Order Supplier', type: 'link' },
				{ path: '/logistics/delivery-list', title: 'Delivery List', type: 'link' }
			]
		},
		{
			title: 'Accounting', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Open Item List', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Billing', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Reminder', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Cost and Performance Account', type: 'link' }
			]
		},
		{
			title: 'Communication', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Tickets', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Serial-Emails', type: 'link' },
			]
		},
		{
			title: 'Tour Planning', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'All Tours', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Create Tour', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Tour Overview', type: 'link' },
				{ path: '/sample/sample-component',  icon: 'headphones', title: 'Tour Sorting', type: 'link' }
			]
		},
		{
			title: 'Settings', icon: 'anchor', type: 'sub', children:
				[
					{
						title: 'Categories', type: 'sub', children: [
							{ path: '/sample/sample-component', title: 'Categories Overview', type: 'link' },
							{ path: '/sample/sample-component', title: 'Connect Product with Category', type: 'link' },
							{ path: '/sample/sample-component', title: 'Create a Category', type: 'link' },
							{ path: '/sample/sample-component', title: 'Product in this Category', type: 'link' }
						]
					},
					{
						title: 'Delivery Areas', type: 'sub', active: false, children: [
							{ path: '/sample/sample-component', title: 'Add Delivery Area', type: 'link' },
							{ path: '/sample/sample-component', title: 'Delivery Areas Overview', type: 'link', },
							{ path: '/sample/sample-component', title: 'Edit Delivery Area', type: 'link' },
						]
					},
					{
						title: 'Non-Delivery Days', type: 'link', active: false
					},
					{
						title: 'Products', type: 'sub', active: false, children: [
							{ path: '/sample/sample-component', title: 'Active Products', type: 'link' },
							{ path: '/sample/sample-component', title: 'Create a Product', type: 'link' },
							{ path: '/sample/sample-component', title: 'Edit Product', type: 'link', },
							{ path: '/sample/sample-component', title: 'Inactive Products', type: 'link' },
						]
					},
					{
						title: 'Settings', type: 'link', icon: 'headphones'
					},
					{
						title: 'Users', type: 'link', icon: 'headphones'
					},
					{
						title: 'Uploads', type: 'link', icon: 'headphones'
					}
				]
		},
		{
			path: '/customers', title: 'Franchises', icon: 'headphones', active: true, type: 'link'
		},
	]
	// tslint:disable-next-line: member-ordering
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
