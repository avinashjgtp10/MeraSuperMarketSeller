import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from "../../services/app.service";
@Injectable({
  providedIn: 'root'
})
export class HomeResolverService implements Resolve<any>{
  constructor(private http: HttpClient, private _as: AppService) { }
  resolve(): Observable<any> {
    return this._as.getAllProducts();
  }
}
