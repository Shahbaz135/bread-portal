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
	  if (this.screenWidth < 1000) {
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
		// {
		// 	path: '/sample/sample-component', title: 'Sample Components', icon: 'headphones', active: true, type: 'link'
		// },
		{
			path: '/dashboard', title: 'Dashboard', icon: 'headphones', active: true, type: 'link'
		},
		{
			title: 'customers', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/customers/customers', title: 'customers', type: 'link' },
				{ path: '/customers/create-customer', title: 'Create Customers', type: 'link' },
				{ path: '/customers/trail-customers', title: 'trail Customers', type: 'link' },
				{ path: '/customers/web-customers', title: 'Web Customers', type: 'link' },
			]
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
				{ path: '/accounting/open-item-list',  icon: 'headphones', title: 'Open Item List', type: 'link' },
				{ path: '/accounting/billing',  icon: 'headphones', title: 'Billing', type: 'link' },
				{ path: '/accounting/remainders',  icon: 'headphones', title: 'Reminder', type: 'link' },
				{ path: '/accounting/cost-performance-accounting',  icon: 'headphones', title: 'Cost & Performance', type: 'link' }
			]
		},
		{
			title: 'Communication', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/communications/tickets',  icon: 'headphones', title: 'Tickets', type: 'link' },
				{ path: '/communications/serial-mails',  icon: 'headphones', title: 'Serial-Emails', type: 'link' },
			]
		},
		{
			title: 'Tour Planning', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/tours/all-tours',  icon: 'headphones', title: 'All Tours', type: 'link' },
				{ path: '/tours/create-tours',  icon: 'headphones', title: 'Create Tour', type: 'link' },
				{ path: '/tours/all-tours',  icon: 'headphones', title: 'Tour Overview', type: 'link' },
				{ path: '/tours/all-tours',  icon: 'headphones', title: 'Tour Sorting', type: 'link' }
			]
		},
		{
			title: 'franchises', icon: 'headphones', type: 'sub', children:
			[
				{ path: '/franchises/create-franchisee',  icon: 'headphones', title: 'Create Franchisee', type: 'link' },
				{ path: '/franchises/manage-franchise',  icon: 'headphones', title: 'Manage Franchise', type: 'link' },
				{ path: '/franchises/all-franchise',  icon: 'headphones', title: 'All Franchises', type: 'link' },
			]
		},
		{
			title: 'Settings', icon: 'anchor', type: 'sub', children:
				[
					{
						title: 'Categories', type: 'sub', children: [
							{ path: '/settings/categories/categories-overview', title: 'Categories Overview', type: 'link' },
							{ path: '/settings/categories/create-categories', title: 'Create a Category', type: 'link' },
							{ path: '/settings/categories/product-categories', title: 'Product in this Category', type: 'link' }
						]
					},
					{
						title: 'Delivery Areas', type: 'sub', active: false, children: [
							{ path: '/settings/delivery-areas/add-delivery-area', title: 'Add Delivery Area', type: 'link' },
							{ path: '/settings/delivery-areas/delivery-areas-overview', title: 'Delivery Areas Overview', type: 'link', },
							{ path: '/settings/delivery-areas/edit-delivery-area', title: 'Edit Delivery Area', type: 'link' },
						]
					},
					{
							path: '/settings/non-delivery-days', title: 'Non-Delivery Days', type: 'link',
					},
					{
						title: 'Products', type: 'sub', active: false, children: [
							{ path: '/settings/active-products', title: 'Active Products', type: 'link' },
							{ path: '/settings/create-product', title: 'Create a Product', type: 'link' },
							{ path: '/settings/edit-product', title: 'Edit Product', type: 'link', },
							{ path: '/settings/inactive-products', title: 'Inactive Products', type: 'link' },
						]
					},
					{
						path: '/settings/users', title: 'users', type: 'link',
					},
					{
						path: '/settings/account-settings', title: 'Settings', type: 'link',
					}
				]
		},
		
	]
	// tslint:disable-next-line: member-ordering
	items = new BehaviorSubject<Menu[]>(this.MENUITEMS);


}
