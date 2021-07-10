import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Input,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddProductComponent } from "../../../model/add-product/add-product.component";
import { HostListerService } from "../../../helper/host-lister.service";
import { AppService } from "../../../services/app.service";
import { AuthService } from "../../../services/auth.service";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-page-setup",
  templateUrl: "./page-setup.component.html",
  styleUrls: ["./page-setup.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PageSetupComponent implements OnInit {
  editShopName: boolean = false;
  screenHeight!: number;
  screenWidth!: number;
  _showBtn: boolean = true;
  isAddressReadonly: boolean = true;
  sellerLinkId: any = "";
  address: any = {
    AddressLine1: "The AddressLine1 field is required.",
    AddressLine2: "",
    AddressLine3: "",
    City: "",
    State: "",
    Country: "",
    Pin: "",
  };
  @Output() opened = new EventEmitter<string>();
  @Input() userInfo: any;

  pageObject = {
    phoneNumber: { errorMessage: "" },
    uniqueId: { errorMessage: "" },
    shopName: { errorMessage: "" },
    state: { errorMessage: "The State field is required." },
    addressLine1: { errorMessage: "The Address Line1 field is required." },
    city: { errorMessage: "he City field is required." },
    Country: { errorMessage: "The Country field is required." },
    pin: { errorMessage: "The Pin field is required." },
  };

  constructor(
    public modalService: NgbModal,
    public service: AppService,
    private _hostListerService: HostListerService,
    private _authService: AuthService,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.getScreenSize();
    this.address = { ...this.address, ...this.userInfo };
  }
  onPhoneChange() {
    this.opened.emit();
  }

  shopName(value: any) {
    this.pageObject.shopName.errorMessage =
      value === "" ? "The ShopName field is required" : "";
    this.userInfo.ShopName = value;
  }

  addressLine1(value: any) {
    this.pageObject.addressLine1.errorMessage =
      value === "" ? "The AddressLine1 field is required" : "";
    this.userInfo["AddressLine1"] = value;
    this.address["AddressLine1"] = value;
  }
  addressLine2(value: any) {
    this.userInfo["AddressLine2"] = value;
    this.address["AddressLine2"] = value;
  }
  addressLine3(value: any) {
    this.userInfo["AddressLine3"] = value;
    this.address["AddressLine3"] = value;
  }
  addCountry(value: any) {
    this.pageObject.Country.errorMessage =
      value === "" ? "The Country field is required" : "";
    this.userInfo["Country"] = value;
    this.address["Country"] = value;
  }
  addressCity(value: any) {
    this.pageObject.city.errorMessage =
      value === "" ? "The City field is required" : "";
    this.userInfo["City"] = value;
    this.address["City"] = value;
  }
  addressState(value: any) {
    this.pageObject.state.errorMessage =
      value === "" ? "The State field is required" : "";
    this.userInfo["State"] = value;
    this.address["State"] = value;
  }
  addressPin(value: any) {
    this.pageObject.pin.errorMessage =
      value === "" ? "The Pin field is required" : "";
    this.address["Pin"] = value;
    this.userInfo["Pin"] = value;
  }
  /**
   * Set Contact Number
   */
  contactNumber(number: any) {
    let regex = /^[6-9]\d{9}$/;
    this.pageObject.phoneNumber.errorMessage = !regex.test(number)
      ? "Invalid Phone Number"
      : "";
    this.userInfo.Phone = number;
  }
  /**
   * Check Unique Cde
   */
  uniqueId(id: any) {
    this.service.validateUniqueId({ Id: id }).subscribe((res) => {
      let msg = "";
      if (res["ReturnType"] === null) {
        msg = res["ReturnMessage"];
      } else if (!res["ReturnType"]["SellerIdExists"]) {
        msg = res["ReturnMessage"];
      }
      this.pageObject.uniqueId.errorMessage = msg;

      this.sellerLinkId = res["ReturnType"]["SellerIdExists"] ? id : "";
      this.userInfo.UniqueId =
        this.sellerLinkId !== "" ? this.sellerLinkId : this.userInfo.UniqueId;
    });
  }

  getScreenSize() {
    this.screenHeight = this._hostListerService.getScreenSize().screenHeight;
    this.screenWidth = this._hostListerService.getScreenSize().screenWidth;
    if (this.screenWidth < 576) {
      this._showBtn = true;
    } else {
      this._showBtn = false;
    }
  }

  saveUser = () => {
    const payloadInfo = this.userInfo;
    let payload = {
      UserName: payloadInfo.Email,
      MobileNumber: payloadInfo.Phone,
      ShopName: payloadInfo.ShopName,
      AddressLine1: payloadInfo.AddressLine1,
      AddressLine2: payloadInfo.AddressLine2,
      AddressLine3: payloadInfo.AddressLine3,
      Landmark: payloadInfo.Landmark,
      City: payloadInfo.City,
      Country: payloadInfo.Country,
      State: payloadInfo.State,
      Pin: payloadInfo.Pin,
      Email: payloadInfo.Email,
      GstNumber: payloadInfo.GST,
      DeliveryCharges: "",
      DeliveryCondition: "",
      StoreOnlineId: payloadInfo.StoreId,
    };
    this._authService.registerSeller(payload).subscribe((res: any) => {
      console.log(res.ReturnMessage);
      this.notifier.notify("success", res.ReturnMessage);
    });
  };
}
