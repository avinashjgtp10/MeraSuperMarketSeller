import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service';
import { delay, exhaustMap, retry, retryWhen, scan, map,share, shareReplay, switchMap, startWith, take } from 'rxjs/operators';
import { NotifierService } from 'angular-notifier';
import { RegisterComponent } from "../../model/register/register.component";
import { interval, Subscription, timer } from 'rxjs';
import { HostListerService } from 'src/app/helper/host-lister.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [NgbModalConfig]
})
export class LoginComponent implements OnInit {
  isOtpSend=false;
  txtEmail:any;
  txtPhone:any;
  name:any;
  email:any;
  emailIsValid=false;
  loading=false;
  counterValue=30;
  @ViewChild("customNotification", { static: true }) customNotificationTmpl: any;
  error: any;
  otp: any;
  countSubscribe!: Subscription;

  constructor(public modalService: NgbModal,private _router:Router,config: NgbModalConfig,
    private _authService: AuthService,
   private _hs:HostListerService,
    private notifier: NotifierService)  {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
  // this.modalService.open(RegisterComponent,{size: 'lg', windowClass: 'custom-class',backdrop:"static",keyboard:false});
 
  }


  sendOtp=(txtEmail:any,txtPhone:any)=>{

      if(txtEmail){
        let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            this.emailIsValid=!re.test(txtEmail)
            if(!re.test(txtEmail))
              return;
      }
      
     this.countSubscribe= this._hs.counter().subscribe(res=>{
        this.counterValue=30
        this.counterValue=this.counterValue-(res+1);
      })

      this.loading = true;
      const param = {
        "UserName": txtEmail || txtPhone
      }
    this._authService.generateOTP(param).pipe(
      retryWhen(err =>
        err.pipe(delay(3000), scan((retrycount) => {
          if (retrycount >= 1) {
            throw err;
          } else {
            retrycount++;
            return retrycount;
          }
        }, 0)
        ))
    ).subscribe(res => {
      console.log(res);
      this.countSubscribe.unsubscribe();
      this.isOtpSend=true;
      if (!res.ReturnValue) {
        this.notifier.show({
          message:res.ReturnMessage,
          type: "error",
          template: this.customNotificationTmpl
        });
      } else{
        this.loading = false;
        this.notifier.show({
          message:res.ReturnMessage,
          type: "success",
          template: this.customNotificationTmpl
        });
      }
    },error => {
      this.error = error.error.error_description;
      this.loading = false;
    })
  }
  
  authorizeToken = () => {
    this.loading = true;
    const param = {
      "grant_type": "password",
      "UserName": this.txtEmail,
      "password": this.otp
    }
    this._authService.authorizeToken(param).pipe(
     
    ).subscribe(res => {
      localStorage.setItem('AUTH_TOKEN', res.access_token);
      localStorage.setItem('USER', JSON.stringify(res));
      this.loading = false;
      this._router.navigate(['/home']);
      this._authService.sellername.next(res.storeName);
      
    }, error => {
      this.error = error.error.error_description;
      this.loading = false;

      // console.log(error);
    })
  }

register() {
  this.modalService.open(RegisterComponent,{size: 'lg', windowClass: 'custom-class',backdrop:"static",keyboard:false});
  //modalRef.componentInstance.src = link;
}
  onOtpChange=(event:any)=>{
    this.otp=event;
  }
}
