import { Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { Router } from "@angular/router";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import Stepper from "bs-stepper";
import { AuthService } from "../../services/auth.service";
import {
  delay,
  exhaustMap,
  retry,
  retryWhen,
  scan,
  share,
  shareReplay,
  switchMap,
} from "rxjs/operators";
import { NotifierService } from "angular-notifier";
@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  txtEmail!: string;
  txtPhone: any;
  public stepper: Stepper | any;
  emailIsValid!: boolean;
  isOtpSend!: boolean;
  state: any = [];
  country: any = [];
  otp: string = "";
  error: string = "";
  message!: string;
  @ViewChild("customNotification", { static: true })
  customNotificationTmpl: any;
  messageType!: string;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private _authService: AuthService,
    private _router: Router,
    private notifier: NotifierService
  ) {}

  ngOnInit(): void {
    this.setStepper();
    this.initialiseForm();
    this.setFormValues();

    this.state = this._authService.getState();
    this.country = this._authService.getCity();
  }

  initialiseForm = () => {
    this.registerForm = this.formBuilder.group({
      UserName: ["", Validators.required],
      MobileNumber: ["", Validators.required],
      ShopName: ["", Validators.required],
      State: ["", Validators.required],
      Email: [
        "",
        [Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$")],
      ],
      City: ["", Validators.required],
      Pin: ["", Validators.required],
      AddressLine1: ["", Validators.required],
      AddressLine2: ["", Validators.required],
      AddressLine3: [""],
      Landmark: [""],
      Country: ["", Validators.required],
    });
  };

  setFormValues = () => {
    this.registerForm.patchValue({
      State: "Maharashtra",
      Country: "India",
    });
  };

  setStepper = () => {
    this.stepper = new Stepper(document.querySelector("#stepper1")!, {
      linear: true,
      animation: true,
    });
  };

  get f() {
    return this.registerForm.controls;
  }

  register = () => {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    this.loading = true;
    this._authService
      .registerSeller(this.registerForm.value)
      .pipe()
      .subscribe(
        (data) => {
          localStorage.setItem("STOREDETAILS", JSON.stringify(data));
          this.notifier.show({
            message: data.ReturnMessage,
            type: "success",
            template: this.customNotificationTmpl,
          });
          this.loading = false;
          this._router.navigate(["/login"]);
        },
        (error) => {
          this.notifier.show({
            message: error.error.error_description,
            type: "error",
            template: this.customNotificationTmpl,
          });
          this.loading = false;
        }
      );
  };

  next() {
    this.stepper.next();
  }

  test() {

  }
  sendOtp = (txtEmail: any, txtPhone: any) => {
    if (txtEmail) {
      let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.emailIsValid = !re.test(txtEmail);
      if (!re.test(txtEmail)) return;
    }
    this.isOtpSend = true;
    const param = {
      UserName: txtEmail || txtPhone,
    };
    this.loading = true;
    this._authService
      .generateOTP(param)
      .pipe(
        retryWhen((err) =>
          err.pipe(
            delay(3000),
            scan((retrycount) => {
              if (retrycount >= 1) {
                throw err;
              } else {
                retrycount++;
                return retrycount;
              }
            }, 0)
          )
        )
      )
      .subscribe((res) => {
        console.log(res);
        if (!res.ReturnValue) {
          this.message = res.ReturnMessage;
          this.messageType = "error";
        } else {
          this.loading = false;
          this.stepper.to(2);
          this.message = res.ReturnMessage;
          this.messageType = "success";
        }
      });
  };

  onOtpChange = (event: string) => {
    this.otp = event;
  };

  authorizeToken = () => {
    console.log(this.stepper);
    this.loading = true;
    const param = {
      grant_type: "password",
      UserName: this.txtEmail,
      password: this.otp,
    };
    this._authService
      .authorizeToken(param)
      .pipe
      // retryWhen(err =>
      //   err.pipe(delay(3000), scan((retrycount) => {
      //     if (retrycount > 1) {
      //       throw err;
      //     } else {
      //       retrycount++;
      //       return retrycount;
      //     }
      //   }, 0)
      //   ))
      ()
      .subscribe(
        (res) => {
          console.log(res);
          localStorage.setItem("AUTH_TOKEN", res.access_token);
          localStorage.setItem("USER", JSON.stringify(res));
          this.loading = false;
          this.message = "";
          this.registerForm.patchValue({
            UserName: res.userName,
          });
          this.next();
        },
        (error) => {
          this.error = error.error.error_description;
          this.loading = false;
          this.message = "";
          // console.log(error);
        }
      );
  };

  lastClick(event: any) {
    console.log(event);
  }
}
