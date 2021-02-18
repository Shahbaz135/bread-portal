import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomersComponent } from './create-customers/create-customers.component';
import { CustomersComponent } from './customers/customers.component';
import { TrailCustomersComponent } from './trail-customers/trail-customers.component';
import { WebCustomersComponent } from './web-customers/web-customers.component';

const routes: Routes = [
  {
    path: ``, redirectTo: `customers`
  },
  { path: `customers`, component: CustomersComponent },
  { path: `trail-customers`, component: TrailCustomersComponent },
  { path: `web-customers`, component: WebCustomersComponent },
  { path: `create-customer`, component: CreateCustomersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomersRoutingModule { }
