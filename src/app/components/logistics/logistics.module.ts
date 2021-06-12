import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogisticsRoutingModule } from './logistics-routing.module';
import { OrderSupplierComponent } from './order-supplier/order-supplier.component';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';


@NgModule({
  declarations: [OrderSupplierComponent, DeliveryListComponent],
  imports: [
    CommonModule,
    LogisticsRoutingModule,
    FormsModule,
    NgxSpinnerModule
  ]
})
export class LogisticsModule { }
