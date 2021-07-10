import { Component, OnInit, ViewChild } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";

import { connectableObservableDescriptor } from "rxjs/internal/observable/ConnectableObservable";
import { OtpModelComponent } from "../../../model/otp-model/otp-model.component";
import { AppService } from "../../../services/app.service";

@Component({
  selector: "app-order-detail",
  templateUrl: "./order-detail.component.html",
  styleUrls: ["./order-detail.component.scss"],
})
export class OrderDetailComponent implements OnInit {
  @ViewChild(OtpModelComponent, { static: false }) otpModel: OtpModelComponent;
  orderDetails: any = {};

  constructor(
    private _router: Router,
    private _appService: AppService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.params.subscribe((params) => {
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
      let storeId = JSON.parse(localStorage.getItem("USER") || "{}").storeId;

      let payload = {
        OrderId: params["orderId"],
        StoreId: storeId,
      };
      this._appService.getOrderDetails(payload).subscribe((res: any) => {
        res["ReturnType"]["Products"] = [
          ...res["ReturnType"]["Products"],
          ...Products,
        ];
        console.log(res["ReturnType"]);
        this.orderDetails = res["ReturnType"];
      });
    });
  }

  gotoMyOrder = (route: string) => {
    this._router.navigateByUrl(route);
  };

  openOtpModel() {
    this.otpModel.openModel();
  }
  verifyOtp(value: any) {
    console.log(value);
    this.otpModel.closeModel();
  }
}
