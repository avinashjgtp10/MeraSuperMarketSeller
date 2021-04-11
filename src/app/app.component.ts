import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'seller-app';
  showHead: boolean = false;



  constructor(private router: Router, private _authService: AuthService) {
    router.events.forEach((event) => {
      if (event instanceof NavigationStart) {
        if (event['url'] == '/login') {
          this.showHead = false;
        } else {
          this.showHead = true;
        }
      }
    });
  }
  ngOnInit() {
    // this._authService.refreshToken().subscribe(res=>{
    //   console.log(res);
    //   localStorage.setItem('USER',res);
    // },error=>{
    //   if(error.error.error=='invalid_grant')
    //   this.router.navigate(['/login']);
    // });
  }
}
