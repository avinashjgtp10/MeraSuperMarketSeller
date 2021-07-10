import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { NotifierService } from "angular-notifier";
import { NgbModal, NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import {
  FormControl,
  FormArray,
  FormGroup,
  Validators,
  FormBuilder,
} from "@angular/forms";
import {
  NgxFileDropEntry,
  FileSystemFileEntry,
  FileSystemDirectoryEntry,
} from "ngx-file-drop";
import { AppService } from "../../services/app.service";

interface ICustomer {
  key: string;
  value: string;
}

@Component({
  selector: "app-add-product",
  templateUrl: "./add-product.component.html",
  styleUrls: ["./add-product.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class AddProductComponent implements OnInit, AfterViewInit {
  @ViewChild("customNotification", { static: true })
  customNotificationTmpl: any;
  addProductForm!: FormGroup;
  loading = false;
  submitted = false;
  public files: NgxFileDropEntry[] = [];
  images: any = [];
  img: any;
  time!: number;
  specifications: ICustomer[] = [];
  key!: string;
  value!: string;
  isError = false;
  productCategory: any = [];
  selectedProduct: any;

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer,
    private notifier: NotifierService,
    private _appService: AppService
  ) {}
  tag = ["Pizza", "Pasta", "Parmesan"];
  Color = [];
  size = ["S", "M", "L"];
  sizeFor = [
    { id: 1, isChecked: false, value: "Men" },
    { id: 2, isChecked: false, value: "Women" },
    { id: 3, isChecked: false, value: "kid" },
    { id: 4, isChecked: false, value: "Boys" },
    { id: 5, isChecked: false, value: "Girls" },
  ];
  gender = ["Boys", "Girls"];
  status = ["In Stock", "Out of Stock"];
  shippableProductStatus = ["Yes", "No"];
  deliveryOption = [
    {
      name: "Pick up",
      value: true,
    },
    {
      name: "Delivery",
      value: false,
    },
  ];
  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      Title: ["", Validators.required],
      ProductId: [""],
      SellingPrice: [100, Validators.required],
      MRP: [100, Validators.required],
      Tags: ["", Validators.required],
      Description: ["", Validators.required],
      Delivery: ["", Validators.required],
      ShippingCost: [100, Validators.required],
      Size: ["", Validators.required],
      Color: ["", Validators.required],
      BrandName: ["", Validators.required],
      GST: [""],
      SKU: [""],
      barCode: [""],
      TaxablePrice: [""],
      MaxItemInOneShipment: [""],
      Category: ["", Validators.required],
      Target: [""],
      sizeFor: ["", Validators.required],
      AvailabilityStatus: ["", Validators.required],
      Specification: ["", Validators.required],
      shipStatus: ["", Validators.required],
    });

    /**
     * Get Product category
     */
    this._appService.getProductCategory().subscribe((res) => {
      console.log(res.ReturnType);
      this.productCategory = res.ReturnType;
    });
  }
  ngAfterViewInit() {}
  get f() {
    return this.addProductForm.controls;
  }

  addProduct = () => {
    this.submitted = true;
    let prodDetails = this.addProductForm.value;
    let deliveryInfo = {
      IsShipable: prodDetails["shipStatus"] ? "Yes" : "No",
      IsDeliverable: prodDetails["Delivery"] ? "Yes" : "No",
      PickupAvailable: !prodDetails["Delivery"] ? "Yes" : "No",
    };

    let payload = {
      Title: prodDetails["Title"],
      ProductId: "",
      SellingPrice: prodDetails["SellingPrice"],
      MRP: prodDetails["MRP"],
      Tags: prodDetails["Tags"].toString(),
      Description: prodDetails["Description"],
      Delivery: JSON.stringify(deliveryInfo),
      ShippingCost: prodDetails["ShippingCost"],
      Size: prodDetails["ShippingCost"].toString(),
      Color: prodDetails["Color"].map((el: any) => el.value).toString(),
      BrandName: prodDetails["BrandName"],
      Category: "Fashion",
      Specification: JSON.stringify(this.specifications),
      GST: prodDetails["GST"],
      barCode: prodDetails["barCode"],
      SKU: prodDetails["SKU"],
      MaxItemInOneShipment: "1",
      AvailabilityStatus: prodDetails["AvailabilityStatus"],
      Target: '{"Men":true,"Women":true,"Kids":true,"Gender":"girls"}',
    };

    // stop here if form is invalid
    // if (this.addProductForm.invalid) {
    //   return;
    // }

    this.loading = true;
    this._appService.addProduct(payload).subscribe(
      (data) => {
        // {ProductId: "e681f591-ba88-4f3f-b67e-5cf67e7b8eb4"}
        const formData = new FormData();
        formData.append("fileName", `${data.ProductId}_${this.images.length}`);
        formData.append("File1", this.images[0]);

        this._appService.uploadProducImage(formData).subscribe((res: any) => {
          console.log(res);
        });
        this.notifier.show({
          message: data.ReturnMessage,
          type: "error",
          template: this.customNotificationTmpl,
        });
        this.loading = false;
      },
      (error) => {
        console.log(error);
      }
    );
  };
  public dropped(files: NgxFileDropEntry[]) {
    if (files.length > 4) {
      this.notifier.show({
        message: "Cannot add more than 4 Files at a time.",
        type: "error",
        template: this.customNotificationTmpl,
      });
    } else {
      // this.files = files;
      this.imageDropped(files);
      for (const droppedFile of files) {
        // Is it a file?
        if (
          droppedFile.fileEntry.isFile &&
          this.isFileAllowed(droppedFile.fileEntry.name)
        ) {
          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {
            if (this.isFileSizeAllowed(file.size)) {
              //files array is used to display
              //the files to the user which will be uploaded
              this.files.push(droppedFile);
              if (this.files.length < 6) {
                // Here you can access the real file
                console.log(droppedFile.relativePath, file);
                const formData = new FormData();
                //   this.formData.append(`img${this.index}`, file, droppedFile.relativePath);
                //  this.index++;

                /**
                // You could upload it like this:
                const formData = new FormData()
                formData.append('logo', file, relativePath)
       
                // Headers
                const headers = new HttpHeaders({
                  'security-token': 'mytoken'
                })
       
                this.http.post('https://mybackend.com/api/upload/sanitize-and-save-logo', formData, { headers: headers, responseType: 'blob' })
                .subscribe(data => {
                  // Sanitized logo returned from backend
                })
                **/
              } else {
                // this.toastr.error("Maximum 6 files are allowed.");
              }
            } else {
              // this.toastr.error("Max size of a file allowed is 1mb, files with size more than 1mb are discarded.");
            }
          });
        } else {
          // It was a directory (empty directories are added, otherwise only files)
          // this.toastr.error("Only files in '.pdf', '.jpg', '.jpeg', '.png' format are accepted and directories are not allowed.");
          // const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
          // console.log(droppedFile.relativePath, fileEntry);
        }
      }
    }
  }

  isFileAllowed(fileName: string) {
    let isFileAllowed = false;
    const allowedFiles = [".pdf", ".jpg", ".jpeg", ".png"];
    const regex = /(?:\.([^.]+))?$/;
    const extension = regex.exec(fileName);
    if (undefined !== extension && null !== extension) {
      for (const ext of allowedFiles) {
        if (ext === extension[0]) {
          isFileAllowed = true;
        }
      }
    }
    return isFileAllowed;
  }

  isFileSizeAllowed(size: number) {
    let isFileSizeAllowed = false;
    if (size < 1000000) {
      isFileSizeAllowed = true;
    }
    return isFileSizeAllowed;
  }

  imageDropped($event: any) {
    for (const item of $event) {
      const droppedFile = item;
      const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
      const reader = new FileReader();
      fileEntry.file((file) => {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.img = reader.result;
          this.images.push(
            this.sanitizer.bypassSecurityTrustResourceUrl(this.img)
          );
          // this.images.push(this.img);
        };
      });
    }
  }

  add(key: any, value: any) {
    let obj: any = [];
    if (key && value) {
      obj = { key, value };
      this.specifications.push(obj);
      this.key = "";
      this.value = "";
    } else {
      this.isError = true;
      this.notifier.show({
        type: "error",
        message: "Please enter both values",
        template: this.customNotificationTmpl,
      });
    }
  }
  delete(arr: any, x: number) {
    // var delBtn = confirm(" Do you want to delete ?");
    // if ( delBtn == true ) {
    arr.splice(x, 1);
    // }
  }

  change(name: string, $event: any) {
    console.log(name);
    console.log($event);
  }
  /**
   Save Product 
   */
  saveProduct() {
    console.log(this.addProductForm);
    console.log("Save product");
  }

  onOptionsSelected(event: any) {
    this.addProductForm.controls["Category"].setValue(event.target.value);
  }
  sizeForChange(event: any, item: any) {
    let myObj = { [item.value]: event.target.checked };
    let obj = { Men: false, Women: false, Kids: false, Gender: "girls" };
    let targetObj = { ...obj, ...myObj };
    this.addProductForm.controls["Target"].setValue(JSON.stringify(targetObj));
  }

  avaStatus(event: any) {
    this.addProductForm.controls["AvailabilityStatus"].setValue(
      event.target.value
    );
  }
  shippableStatus(event: any) {
    this.addProductForm.controls["shipStatus"].setValue(event.target.value);
  }

  chooseDeliveryOption(event: any) {
    this.addProductForm.controls["Delivery"].setValue(event.target.value);
  }
}
