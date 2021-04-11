import { Component, HostListener, OnInit } from '@angular/core';
import { HostListerService } from "./../../helper/host-lister.service";
@Component({
  selector: 'app-coupen',
  templateUrl: './coupen.component.html',
  styleUrls: ['./coupen.component.scss']
})
export class CoupenComponent implements OnInit {
  _opened: boolean = true;
 _showBtn: boolean=false;
 screenHeight!: number;
 screenWidth!: number;
  constructor(private _hostListerService:HostListerService) { }

  ngOnInit(): void {
    this.getScreenSize();
  }
  _toggleSidebar() {
    this._opened = !this._opened;
  }

  getScreenSize() {
    this.screenHeight =  this._hostListerService.getScreenSize().screenHeight;
    this.screenWidth = this._hostListerService.getScreenSize().screenWidth;
    if (this.screenWidth < 576) {
      this._opened = false;
      this._showBtn = true;
    } else {
      this._opened = true;
      this._showBtn = false;
    }
  }

  @HostListener('window:resize', ['$event']) onResize(event:any) {
    this.getScreenSize()
 }
}
