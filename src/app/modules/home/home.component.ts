import { Component, OnInit, ViewEncapsulation, HostListener } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddProductComponent } from '../../model/add-product/add-product.component';
import { HostListerService } from "../../helper/host-lister.service";
import { AppService } from "../../services/app.service";
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
  productList: any;
  constructor(public _modalService: NgbModal,
    private _hostListerService: HostListerService,
    private _appService: AppService,
    private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getScreenSize();
    this.getAllProduct();
  }

  _opened: boolean = true;
  _showBtn: boolean = false;

  _toggleSidebar() {
    this._opened = !this._opened;
  }

  getScreenSize() {
    this.screenHeight = this._hostListerService.getScreenSize().screenHeight;
    this.screenWidth = this._hostListerService.getScreenSize().screenWidth;
    // /  console.log(this.screenHeight, this.screenWidth);
    if (this.screenWidth < 576) {
      this._opened = false;
      this._showBtn = true;
    } else {
      this._opened = true;
      this._showBtn = false;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event: any) {
    this.getScreenSize()
  }


  addProduct = () => {
    this._modalService.open(AddProductComponent, { size: 'lg', windowClass: 'custom-class' });
  }

  getAllProduct = () => {
    this._activatedRoute.data.subscribe(res => {
      res.data.ReturnValue ? this.productList = res.data.ReturnType : "";
    });
  }
}
