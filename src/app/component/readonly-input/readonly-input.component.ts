import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-readonly-input",
  templateUrl: "./readonly-input.component.html",
  styleUrls: ["./readonly-input.component.scss"],
})
export class ReadonlyInputComponent implements OnInit {
  @Input() inputValue: any;
  @Input() placeholder: any;
  @Input() isReadonly: any;
  @Output() valueChange = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  inputChange = (event: any) => {
    this.valueChange.emit(event.currentTarget.value);
  };
}
