import {
  Component,
  OnInit,
  ViewEncapsulation,
  HostListener,
} from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { AddProductComponent } from "../../model/add-product/add-product.component";
import { HostListerService } from "../../helper/host-lister.service";
import { AppService } from "../../services/app.service";
import { ActivatedRoute } from "@angular/router";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
  productList: any;

  constructor(
    public _modalService: NgbModal,
    private _hostListerService: HostListerService,
    private _appService: AppService,
    private _activatedRoute: ActivatedRoute,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.getScreenSize();
    this.getAllProduct();
    this.getSellerDetails();
  }

  _opened: boolean = true;
  _showBtn: boolean = false;
  sellerDetails: any = [];

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  getScreenSize() {
    this.screenHeight = this._hostListerService.getScreenSize().screenHeight;
    this.screenWidth = this._hostListerService.getScreenSize().screenWidth;
    if (this.screenWidth < 576) {
      this._opened = false;
      this._showBtn = true;
    } else {
      this._opened = true;
      this._showBtn = false;
    }
  }

  @HostListener("window:resize", ["$event"]) onResize(event: any) {
    this.getScreenSize();
  }

  addProduct = () => {
    this._modalService.open(AddProductComponent, {
      size: "lg",
      windowClass: "custom-class",
    });
  };

  getAllProduct = () => {
    this._activatedRoute.data.subscribe((res) => {
      res.data.ReturnValue ? (this.productList = res.data.ReturnType) : "";
    });
  };

  /**
   * Upload Banner Image
   */
  uploadBanner(file: any) {
    let fileList = file.currentTarget.files[0];

    let name = fileList.name;
    const formData = new FormData();
    formData.append("fileName", "Banner123");
    formData.append("File1", fileList);
    this._appService.uploadBannerImage(formData).subscribe((response: any) => {
      console.log(response);
      this.notifier.notify("success", response);
    });
  }

  /**
   * Upload Profile Image
   */
  uploadProfileImage(file: any) {
    let fileList = file.currentTarget.files[0];
    let name = fileList.name;
    const formData = new FormData();
    formData.append("fileName", name);
    formData.append("File1", fileList);

    this._appService.uploadProfileImage(formData).subscribe((response: any) => {
      this.notifier.notify("success", response);
    });
  }

  /**
   * Get Seller details
   */
  getSellerDetails() {
    this._appService.getSellerDetails().subscribe((res) => {
      this.sellerDetails = res["ReturnType"][0];
    });
  }
}
