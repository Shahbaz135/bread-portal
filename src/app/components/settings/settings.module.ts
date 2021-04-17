import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { CategoriesOverviewComponent } from './categories/categories-overview/categories-overview.component';
import { CreateCategoriesComponent } from './categories/create-categories/create-categories.component';
import { ProductCategoriesComponent } from './categories/product-categories/product-categories.component';
import { AddDeliveryAreaComponent } from './delivery-areas/add-delivery-area/add-delivery-area.component';
import { DevlieryAreasOverviewComponent } from './delivery-areas/devliery-areas-overview/devliery-areas-overview.component';
import { EditDeliveryAreaComponent } from './delivery-areas/edit-delivery-area/edit-delivery-area.component';
import { NonDeliveryDaysComponent } from './non-delivery-days/non-delivery-days.component';
import { ActiveProductsComponent } from './products/active-products/active-products.component';
import { CreateProductComponent } from './products/create-product/create-product.component';
import { EditProductComponent } from './products/edit-product/edit-product.component';
import { InactiveProductsComponent } from './products/inactive-products/inactive-products.component';
import { UsersComponent } from './users/users.component';
import { NgbModule, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [
    CategoriesOverviewComponent,
    CreateCategoriesComponent,
    ProductCategoriesComponent,
    AddDeliveryAreaComponent,
    DevlieryAreasOverviewComponent,
    EditDeliveryAreaComponent,
    NonDeliveryDaysComponent,
    ActiveProductsComponent,
    CreateProductComponent,
    EditProductComponent,
    InactiveProductsComponent,
    UsersComponent,
    AccountSettingsComponent,
    EditUserComponent],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    NgbNavModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule
  ]
})
export class SettingsModule { }
