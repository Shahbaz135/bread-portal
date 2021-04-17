import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { CategoriesOverviewComponent } from './categories/categories-overview/categories-overview.component';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';
import { ProductCategoriesComponent } from './categories/product-categories/product-categories.component';
import { AddDeliveryAreaComponent } from './delivery-areas/add-delivery-area/add-delivery-area.component';
import { DevlieryAreasOverviewComponent } from './delivery-areas/devliery-areas-overview/devliery-areas-overview.component';
import { EditDeliveryAreaComponent } from './delivery-areas/edit-delivery-area/edit-delivery-area.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { NonDeliveryDaysComponent } from './non-delivery-days/non-delivery-days.component';
import { ActiveProductsComponent } from './products/active-products/active-products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { InactiveProductsComponent } from './products/inactive-products/inactive-products.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path: `categories/categories-overview`, component: CategoriesOverviewComponent },
  { path: `categories/create-categories`, component: CreateCategoriesComponent },
  { path: `categories/edit-category/:id`, component: CreateCategoriesComponent },
  { path: `categories/:id`, component: ProductCategoriesComponent },
  { path: `delivery-areas/add-delivery-area`, component: AddDeliveryAreaComponent },
  { path: `delivery-areas/delivery-areas-overview`, component: DevlieryAreasOverviewComponent },
  { path: `delivery-areas/edit-delivery-area/:id`, component: EditDeliveryAreaComponent },
  { path: `non-delivery-days`, component: NonDeliveryDaysComponent },
  { path: `active-products`, component: ActiveProductsComponent },
  { path: `inactive-products`, component: InactiveProductsComponent },
  { path: `create-product`, component: CreateProductComponent },
  { path: `edit-product/:id`, component: EditProductComponent },
  { path: `users`, component: UsersComponent },
  { path: `users/:id`, component: EditUserComponent },
  { path: `account-settings`, component: AccountSettingsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
