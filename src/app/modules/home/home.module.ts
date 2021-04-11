import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {  ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { AddProductComponent } from '../../model/add-product/add-product.component';

import { NgxFileDropModule } from 'ngx-file-drop';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ReactiveFormsModule,NgxFileDropModule
  ],
 
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents:[AddProductComponent]
})
export class HomeModule {
 
 }
