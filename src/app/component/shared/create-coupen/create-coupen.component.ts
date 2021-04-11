import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-coupen',
  templateUrl: './create-coupen.component.html',
  styleUrls: ['./create-coupen.component.scss']
})
export class CreateCoupenComponent implements OnInit {
  usageType=['Single','Multiple'];
  coupenForm!:FormGroup;
  submitted=false;
  constructor(
    private _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
    this.coupenForm=this._formBuilder.group({
      name:["",Validators.required],
      promoType:["",Validators.required],
      desc:["",Validators.required],
      amountOff:["",Validators.required],
      limit:["",Validators.required],
      userID:["",Validators.required],
      validFrom:["",Validators.required],
      toDate:["",Validators.required],
      usageType:["",Validators.required],
      coupenCode:["",Validators.required],
    })
  }
  get f(){return this.coupenForm.controls;}
 
  addCoupen=()=>{
    
  }

}
