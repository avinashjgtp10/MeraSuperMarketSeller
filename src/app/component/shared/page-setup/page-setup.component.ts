import { Component, EventEmitter, HostListener, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  AddProductComponent} from "../../../model/add-product/add-product.component";
import { HostListerService } from "../../../helper/host-lister.service";
@Component({
  selector: 'app-page-setup',
  templateUrl: './page-setup.component.html',
  styleUrls: ['./page-setup.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class PageSetupComponent implements OnInit {
  screenHeight!: number;
  screenWidth!: number;
  _showBtn: boolean=true;
  constructor(public modalService: NgbModal,private _hostListerService:HostListerService) { }
  @Output() opened = new EventEmitter<string>();
  ngOnInit(): void {
     this.getScreenSize();
    // this.addProduct();
  //  const v= this._hostListerService.getScreenSize().screenHeight;
  
  }
  onPhoneChange() {
    this.opened.emit();
  }
  
  getScreenSize() {
    this.screenHeight =  this._hostListerService.getScreenSize().screenHeight;
    this.screenWidth = this._hostListerService.getScreenSize().screenWidth;
    //console.log(this.screenHeight, this.screenWidth);
    if (this.screenWidth < 576) {
      this._showBtn = true;
    } else {
      this._showBtn = false;
    }
  }

  addProduct=()=>{
    
    this.modalService.open(AddProductComponent,{size: 'lg', windowClass: 'custom-class'});

  }


}
