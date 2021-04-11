import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../services/auth.service";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  sellerName!: string;

  constructor(private _authService:AuthService) { 
    this._authService.sellername.subscribe(res=>{
      this.sellerName=res;
    })
  }

  ngOnInit(): void {
   
  }
  logout=()=>{
    this._authService.logout();
  }

}
