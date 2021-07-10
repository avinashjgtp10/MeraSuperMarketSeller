import { Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { AppService } from "../../services/app.service";
import { OtpModelComponent } from "../../model/otp-model/otp-model.component";

@Component({
  selector: "app-my-orders",
  templateUrl: "./my-orders.component.html",
  styleUrls: ["./my-orders.component.scss"],
})
export class MyOrdersComponent implements OnInit {
  _showBtn: boolean = true;
  screenHeight!: number;
  screenWidth!: number;

  _opened: boolean = true;

  orderType = ["New Orders", "Completed Orders"];
  actionList: any = [];
  activeOrderList: string = "New Orders";
  active = 0;
  productLength = 0;

  itemsList: any = [];

  constructor(private _router: Router, private _service: AppService) {}

  ngOnInit(): void {
    this._service.getNewOrder().subscribe((res: any) => {
      console.log(res["ReturnType"]);
      let Products = [
        {
          ImageUrl: "business-test-merasupermarket.azurewebsites.net",
          Name: "Camera12",
          Price: 1300,
          ProductId: null,
          Quantity: 1,
        },
        {
          ImageUrl:
            "/Artifacts/Users/724b5938-372a-4566-963d-9bc8c117b685/9140d5f3-d9a6-473a-bab9-0d9db48c023f_1.jpeg",
          Name: "Camera12",
          Price: 1400,
          ProductId: null,
          Quantity: 1,
        },
        {
          ImageUrl:
            "/Artifacts/Users/636a61bc-3f82-4a14-808f-d270874370fb/64fc2f97-faba-400d-8542-58c553620245_1.jpg",
          Name: "Camera",
          Price: 1400,
          ProductId: null,
          Quantity: 1,
        },
        {
          ImageUrl:
            "/Artifacts/Users/724b5938-372a-4566-963d-9bc8c117b685/9140d5f3-d9a6-473a-bab9-0d9db48c023f_1.jpeg",
          Name: "Camera12",
          Price: 1400,
          ProductId: null,
          Quantity: 1,
        },
        {
          ImageUrl:
            "/Artifacts/Users/636a61bc-3f82-4a14-808f-d270874370fb/64fc2f97-faba-400d-8542-58c553620245_1.jpg",
          Name: "Camera",
          Price: 1400,
          ProductId: null,
          Quantity: 1,
        },
      ];
      let item = res["ReturnType"].map((el: any) => {
        let products = [...el.Products, ...Products];
        el.Plength = products.length - 3;
        this.productLength = el.Plength;
        el.Products = products.slice(0, 3);
        return el;
      });
      this.itemsList = item;
    });
    this._service.getAllOrderStatus().subscribe((res: any) => {
      this.actionList = res.ReturnType;
    });
  }

  viewOrderDetails = (event: any) => {
    this._router.navigate(["order-detail", { orderId: event["OrderId"] }]);

    // event.stopPropagation();
  };
}
