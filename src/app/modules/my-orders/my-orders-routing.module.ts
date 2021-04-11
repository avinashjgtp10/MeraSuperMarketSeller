import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyOrdersComponent } from './my-orders.component';
import { OrderDetailComponent } from './order-detail/order-detail.component';

const routes: Routes = [
  {path: '', component: MyOrdersComponent},
  // { path: 'order-detail', component: OrderDetailComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyOrdersRoutingModule { }
