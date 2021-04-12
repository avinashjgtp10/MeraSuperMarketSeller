import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-float-text",
  templateUrl: "./float-text.component.html",
  styleUrls: ["./float-text.component.scss"],
})
export class FloatTextComponent implements OnInit {
  isEdit: boolean = true;
  @Input() label: string = "";
  @Input() value: string = "";
  @Input() type:string="";
  @Input() errorMsg:string=""
  @Output() onChange = new EventEmitter();
  

  constructor() {}

  ngOnInit(): void {
    this.onChange.emit(this.value);
  }
  /**
   * Change
   */
  getValue(event:any){
    this.value = event.currentTarget.value;
    this.onChange.emit(event.currentTarget.value);
  }
}
