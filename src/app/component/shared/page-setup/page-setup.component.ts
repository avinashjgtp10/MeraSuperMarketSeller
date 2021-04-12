import {
  Component,
  EventEmitter,
  HostListener,
  OnInit,
  Output,
  ViewEncapsulation,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddProductComponent } from "../../../model/add-product/add-product.component";
import { HostListerService } from "../../../helper/host-lister.service";
import { AppService } from "../../../services/app.service";

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
  @Output() opened = new EventEmitter<string>();

  pageObject = {
    phoneNumber: { errorMessage: "" },
    uniqueId: { errorMessage: "" },
  };

  constructor(
    public modalService: NgbModal,
    public service: AppService,
    private _hostListerService: HostListerService
  ) {}

  ngOnInit(): void {
    this.getScreenSize();
  }
  onPhoneChange() {
    this.opened.emit();
  }

  shopName(value: any) {
    console.log(value);
  }
  /**
   * Set Contact Number
   */
  contactNumber(number: any) {
    let regex = /^[6-9]\d{9}$/;
    this.pageObject.phoneNumber.errorMessage = !regex.test(number)
      ? "Invalid Phone Number"
      : "";
  }
  /**
   * Check Unique Cde
   */
  uniqueId(id: any) {
    console.log(id);
    this.pageObject.uniqueId.errorMessage = "invalid ID";
    // this.service.validateUniqueId({ Id: id }).subscribe((res) => {
    //   console.log(res);
    // });
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

  addProduct = () => {
    this.modalService.open(AddProductComponent, {
      size: "lg",
      windowClass: "custom-class",
    });
  };
}
