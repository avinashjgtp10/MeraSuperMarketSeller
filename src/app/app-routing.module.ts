import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './component/contact/contact.component';
import { OrderDetailComponent } from './modules/my-orders/order-detail/order-detail.component';
import { AuthGuard } from "./guard/auth.guard";
const routes: Routes = [
  { path: 'login',  loadChildren: () => import('./modules/login/login.module').then(m => m.LoginModule) },
  { path: 'coupen', canActivate:[AuthGuard], loadChildren: () => import('./modules/coupen/coupen.module').then(m => m.CoupenModule) },
  { path: 'home', canActivate:[AuthGuard],  loadChildren: () => import('./modules/home/home.module').then(m => m.HomeModule) },
  { path: 'contact', component: ContactComponent },
  { path: 'my-orders',canActivate:[AuthGuard],  loadChildren: () => import('./modules/my-orders/my-orders.module').then(m => m.MyOrdersModule) },
  { path: 'order-detail', canActivate:[AuthGuard], component: OrderDetailComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '**', component: lo },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{scrollPositionRestoration:'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
