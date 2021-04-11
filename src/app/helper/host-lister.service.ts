import { HostListener, Injectable } from '@angular/core';
import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HostListerService {
  screenWidth!: number;
  screenHeight!: number;

  constructor() { }
  @HostListener('window:resize', ['$event'])
  getScreenSize() {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
    //console.log(this.screenHeight, this.screenWidth);
   return {
    screenHeight:this.screenHeight,
    screenWidth: this.screenWidth
   }
  }

  counter=()=>{
    return interval(1000).pipe(take(30)); 
  }
}
