import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from "@angular/forms";
@Component({
  selector: 'app-price-mover',
  templateUrl: './price-mover.component.html',
  styleUrls: ['./price-mover.component.scss']
})
export class PriceMoverComponent implements OnInit ,AfterViewInit {
@Input() name!:string;
@Input() addProductForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
//  console.log(this.addProductForm);
//  console.log(this.name);
    
  }

  ngAfterViewInit=()=>{
    console.log(this.addProductForm);
  }

  get f() { return this.addProductForm.controls; }

  increament(control1: string, value: number) {
    this.addProductForm.patchValue({
      [control1]: +this.f[control1].value + value
    });
  }

  decreament(control1: string, value: number) {
    this.addProductForm.patchValue({
      [control1]: +this.f[control1].value - value
    });
  }
}
