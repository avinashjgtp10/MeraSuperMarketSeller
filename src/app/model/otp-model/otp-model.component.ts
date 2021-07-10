import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from "@angular/core";
import { ConsoleService } from "@ng-select/ng-select/lib/console.service";

declare var $: any;

@Component({
  selector: "app-otp-model",
  templateUrl: "./otp-model.component.html",
  styleUrls: ["./otp-model.component.scss"],
})
export class OtpModelComponent implements OnInit {
  @Output() myEvent = new EventEmitter();
  @ViewChild("ngOtpInput") ngOtpInputRef: any;
  otp: any = "";

  constructor() {}

  ngOnInit(): void {}

  openModel() {
    $("#otpModel").modal("show");
  }
  closeModel() {
    $("#otpModel").modal("hide");
    this.ngOtpInputRef.setValue("");
  }

  onOtpChange(event: any) {
    this.otp = event;
  }
  authorizeToken() {
    console.log("test");
  }

  verifyOtp() {
    this.myEvent.emit(this.otp);
  }
}
