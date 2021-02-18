import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { CostPerformanceAccountingComponent } from './cost-performance-accounting/cost-performance-accounting.component';
import { OpenItemListComponent } from './open-item-list/open-item-list.component';
import { RemindersComponent } from './reminders/reminders.component';

const routes: Routes = [
  {
    path: ``, redirectTo: `open-item-list`
  },
  { path: `billing`, component: BillingComponent },
  { path: `open-item-list`, component: OpenItemListComponent },
  { path: `cost-performance-accounting`, component: CostPerformanceAccountingComponent },
  { path: `remainders`, component: RemindersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountingRoutingModule { }
