import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountingRoutingModule } from './accounting-routing.module';
import { BillingComponent } from './billing/billing.component';
import { OpenItemListComponent } from './open-item-list/open-item-list.component';
import { RemindersComponent } from './reminders/reminders.component';
import { CostPerformanceAccountingComponent } from './cost-performance-accounting/cost-performance-accounting.component';


@NgModule({
  declarations: [BillingComponent, OpenItemListComponent, RemindersComponent, CostPerformanceAccountingComponent],
  imports: [
    CommonModule,
    AccountingRoutingModule
  ]
})
export class AccountingModule { }
