import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appBtn]'
})
export class AppBtnDirective implements OnInit {
  @Input() appBtnStaus!: string
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    
  }

  ngOnInit() {
    // console.log(this.appBtnStaus);
    this.changecolor(this.appBtnStaus);
  }

  changecolor(color: string) {
    if (color === "success") {
      this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', '#6fba47');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'white');
    } else {
      this.renderer.setStyle(this.elementRef.nativeElement, 'backgroundColor', 'white');
      this.renderer.setStyle(this.elementRef.nativeElement, 'color', 'black');
    }
  }
}

