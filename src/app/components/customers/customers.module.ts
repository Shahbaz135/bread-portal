import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomersRoutingModule } from './customers-routing.module';
import { CustomersComponent } from './customers/customers.component';
import { TrailCustomersComponent } from './trail-customers/trail-customers.component';
import { WebCustomersComponent } from './web-customers/web-customers.component';
import { CreateCustomersComponent } from './create-customers/create-customers.component';


@NgModule({
  declarations: [CustomersComponent, TrailCustomersComponent, WebCustomersComponent, CreateCustomersComponent],
  imports: [
    CommonModule,
    CustomersRoutingModule
  ]
})
export class CustomersModule { }
