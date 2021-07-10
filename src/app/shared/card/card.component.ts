import { Component, Input, OnInit } from "@angular/core";
import { AppService } from "../../services/app.service";
import { NotifierService } from "angular-notifier";

@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  @Input() productList: any;
  constructor(private _as: AppService, private notifier: NotifierService) {}

  ngOnInit(): void {
    this.productList = this.productList.map((el: any) => {
      el.isPublished = true;
      return el;
    });
  }

  publishCheck(item: any) {
    let payload = {
      ProductId: item.ProductId,
      Flag: item.isPublished ? 1 : 0,
    };
    this._as.publishProduct(payload).subscribe((res) => {
      this.notifier.notify("success", res.ReturnMessage);
      this.productList = this.productList.map((el: any) => {
        if (el.ProductId === item.ProductId) {
          el.isPublished = !el.isPublished;
        }
        return el;
      });
    });

    console.log(item);
  }
}
