import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TagInputModule } from 'ngx-chips';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './modules/login/login.component';
import { HeaderComponent } from './layout/header/header.component';
import { RegisterComponent } from './model/register/register.component';
import { HomeComponent } from './modules/home/home.component';
import { MyOrdersComponent } from './modules/my-orders/my-orders.component';
import { CoupenComponent } from './modules/coupen/coupen.component';
import { ContactComponent } from './component/contact/contact.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { NgxFileDropModule } from 'ngx-file-drop';
import { SidebarModule } from 'ng-sidebar';
import { NgbdSortableHeader } from './modules/coupen/coupen-list/sortable.directive';
import { PageSetupComponent } from './component/shared/page-setup/page-setup.component';
import { AddProductComponent } from './model/add-product/add-product.component';

import { AuthService } from "./services/auth.service";
import { HostListerService } from "./helper/host-lister.service";
import { OrderDetailComponent } from './modules/my-orders/order-detail/order-detail.component';
import { CreateCoupenComponent } from './component/shared/create-coupen/create-coupen.component';
import { CoupenListComponent } from './modules/coupen/coupen-list/coupen-list.component';
import { AppBtnDirective } from './directive/sucess-btn.directive';
import { FooterComponent } from './layout/footer/footer.component';
import { CardComponent } from './shared/card/card.component';
import { LoadingBarHttpClientModule } from '@ngx-loading-bar/http-client';
import { PriceMoverComponent } from './shared/price-mover/price-mover.component';
import { ButtonsComponent } from './component/buttons/buttons.component';
import { FloatTextComponent } from './component/float-text/float-text.component';

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 50,
    },
    vertical: {
      position: "top",
      distance: 50,
      gap: 10,
    },
  },
};
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HeaderComponent,
    RegisterComponent,
    HomeComponent,
    MyOrdersComponent,
    CoupenComponent,
    ContactComponent,
    PageSetupComponent,
    AddProductComponent,
    OrderDetailComponent,
    CreateCoupenComponent,
    CoupenListComponent,
    NgbdSortableHeader,
    AppBtnDirective,
    FooterComponent,
    CardComponent,
    PriceMoverComponent,
    ButtonsComponent,
    FloatTextComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    NgOtpInputModule,
    FormsModule,
    ReactiveFormsModule,
    NgxFileDropModule,
    SidebarModule.forRoot(),
    NotifierModule.withConfig(customNotifierOptions),
    TagInputModule,
    BrowserAnimationsModule,
    LoadingBarModule,
    NgSelectModule,
    LoadingBarHttpClientModule
  ],
  providers: [AuthService, HostListerService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents: [],
})
export class AppModule { }
