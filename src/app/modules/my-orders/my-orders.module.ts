import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyOrdersRoutingModule } from './my-orders-routing.module';

console.log("in my order")
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MyOrdersRoutingModule
  ]
})
export class MyOrdersModule { }
