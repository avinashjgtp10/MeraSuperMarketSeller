import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-buttons",
  templateUrl: "./buttons.component.html",
  styleUrls: ["./buttons.component.scss"],
})
export class ButtonsComponent implements OnInit {
  @Input() label: string = "";
  @Input() btnType: string = "";
  @Input() isLoading: boolean = false;
  @Input() isDisabled: boolean = true;
  @Output() onClick = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onClickButton(event: any) {
    this.onClick.emit(event);
  }
}
