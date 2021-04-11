import { Component, OnInit } from '@angular/core';
import { Router  } from "@angular/router";
@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {

  constructor(private _router:Router) { }

  ngOnInit(): void {
  }

  gotoMyOrder=(route:string)=>{
    this._router.navigateByUrl(route);
  }
}
