import { CommonModule } from '@angular/common';
import { NgModule, NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxFileDropModule } from 'ngx-file-drop';
import { RegisterComponent } from 'src/app/model/register/register.component';
import { LoginRoutingModule } from './login-routing.module';

console.log("in login");
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,NgxFileDropModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  entryComponents:[RegisterComponent]
})
export class LoginModule { }
