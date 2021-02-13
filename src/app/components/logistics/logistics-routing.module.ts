import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryListComponent } from './delivery-list/delivery-list.component';
import { OrderSupplierComponent } from './order-supplier/order-supplier.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: `order-supplier`
  //   // children: [
  //   //   {
  //   //     path: 'order-supplier',
  //   //     component: OrderSupplierComponent,
  //   //   },
  //   //   {
  //   //     path: 'delivery-list',
  //   //     component: DeliveryListComponent,
  //   //   }
  //   // ]
  // }
  {
    path: ``, redirectTo: `order-supplier`
  },
  { path: `order-supplier`, component: OrderSupplierComponent },
  { path: `delivery-list`, component: DeliveryListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogisticsRoutingModule { }
