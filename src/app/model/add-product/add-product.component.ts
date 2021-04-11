import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormArray, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry, } from 'ngx-file-drop';

interface ICustomer {
  key: string;
  value: string;
}

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddProductComponent implements OnInit, AfterViewInit {
  @ViewChild("customNotification", { static: true }) customNotificationTmpl: any;
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
  isError=false;
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private sanitizer: DomSanitizer, private notifier: NotifierService) { }
  tag = ['Pizza', 'Pasta', 'Parmesan'];
  size = ['S', 'M', 'L'];
  sizeFor = ['Men', 'Women', 'kid'];
  gender = ['Boys', 'Girls'];
  status = ['In Stock', 'Out of Stock'];
  shippableProductStatus = ['Yes', 'No'];
  deliveryOption = [
  { 
    name: 'Pick up',
    value:true
  },
  { 
    name: 'Delivery',
    value:false
  }]
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
      GST:[""],
      MaxItemInOneShipment:[""],
      Category: ["", Validators.required],
      Target:[""],


      sizeFor: ["", Validators.required],
      AvailabilityStatus: ["", Validators.required],
      Specification: ["", Validators.required],
      shipStatus: ["", Validators.required],
     

    })
  }
  ngAfterViewInit() {

  }
  get f() { return this.addProductForm.controls; }

  addProduct = () => {
    this.submitted = true;
console.log(this.addProductForm.value);
    // stop here if form is invalid
    if (this.addProductForm.invalid) {
      return;
    }

    this.loading = true;
    // this.userService.addProduct(this.addProductForm.value)
    //     .pipe(first())
    //     .subscribe(
    //         data => {
    //             this.alertService.success('Registration successful', true);
    //             this.router.navigate(['/login']);
    //         },
    //         error => {
    //             this.alertService.error(error);
    //             this.loading = false;
    //         });
  }
  public dropped(files: NgxFileDropEntry[]) {
    if (files.length > 4) {
      this.notifier.show({
        message: "Cannot add more than 4 Files at a time.",
        type: "error",
        template: this.customNotificationTmpl
      });

    } else {
      // this.files = files;
      this.imageDropped(files);
      for (const droppedFile of files) {

        // Is it a file?
        if (droppedFile.fileEntry.isFile && this.isFileAllowed(droppedFile.fileEntry.name)) {

          const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
          fileEntry.file((file: File) => {

            if (this.isFileSizeAllowed(file.size)) {
              //files array is used to display
              //the files to the user which will be uploaded
              this.files.push(droppedFile);
              if (this.files.length < 6) {

                // Here you can access the real file
                console.log(droppedFile.relativePath, file);
                const formData = new FormData()
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
    const allowedFiles = ['.pdf', '.jpg', '.jpeg', '.png'];
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
      fileEntry.file(file => {
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.img = reader.result;
          this.images.push(this.sanitizer.bypassSecurityTrustResourceUrl(this.img));
          // this.images.push(this.img);
        };
      });
    }
  }

  add(key: any, value: any) {
    let obj: any = [];
    if (key && value) {
      obj = { key, value }
      this.specifications.push(obj);
      this.key = "";
      this.value = "";
    }
    else {
    this.isError=true;
      this.notifier.show({ type: 'error', message: "Please enter both values", template: this.customNotificationTmpl });
    }
  }
  delete(arr:any,x: number) {
    // var delBtn = confirm(" Do you want to delete ?");
    // if ( delBtn == true ) {
    arr.splice(x, 1);
    // }   
  }

  change(name:string,$event:any){
    console.log(name);
    console.log($event);

  }

} 
