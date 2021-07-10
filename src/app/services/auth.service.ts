import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { HttpService } from "./http.service";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
@Injectable({
  providedIn: "root",
})
export class AuthService {
  baseUrl = environment.baseUrl;
  authUrl = environment.authUrl;
  sellername = new BehaviorSubject<any>("User");
  constructor(private httpService: HttpService, private router: Router) {}

  isLoggedIn = () => {
    let user = JSON.parse(localStorage.getItem("USER") || "{}");
    this.sellername.next(user.storeName);
    return !!localStorage.getItem("USER");
  };
  logout = () => {
    localStorage.removeItem("USER");
    localStorage.removeItem("AUTH_TOKEN");
    this.router.navigate(["/"]);
  };
  getState = () => {
    let states = [
      "Andhra Pradesh",
      "Arunachal Pradesh",
      "Assam",
      "Bihar",
      "Chhattisgarh",
      "Goa",
      "Gujarat",
      "Haryana",
      "Himachal Pradesh",
      "Jammu and Kashmir",
      "Jharkhand",
      "Karnataka",
      "Kerala",
      "Madhya Pradesh",
      "Maharashtra",
      "Manipur",
      "Meghalaya",
    ];
    return states;
  };
  getCity = () => {
    let country = [
      "Afghanistan",
      "Albania",
      "Algeria",
      "Andorra",
      "Angola",
      "Anguilla",
      "India",
    ];
    return country;
  };

  getToken = (param: any) => {
    // return this._httpClient.post(environment.baseUrl + 'token', param);
    return this.httpService
      .post(environment.baseUrl + "token", param)
      .pipe(map((data) => data));
  };

  generateOTP = (param: any) => {
    return this.httpService
      .post(environment.authUrl + "account/GenerateOTP", param)
      .pipe(map((data) => data));
  };
  authorizeToken = (param: any) => {
    const body = new HttpParams()
      .set("username", param.UserName)
      .set("grant_type", "password")
      .set("password", param.password);

    return this.httpService
      .post(environment.baseUrl + "token", body.toString(), this.getHeader())
      .pipe(map((data) => data));
  };

  refreshToken = () => {
    let user = JSON.parse(localStorage.getItem("USER") || "{}");
    const body = new HttpParams()
      .set("grant_type", "refresh_token")
      .set("refresh_token", user.refresh_token);
    return this.httpService.post(
      environment.baseUrl + "token",
      body.toString(),
      this.getHeader()
    );
  };
  
  registerSeller = (param: any) => {
    return this.httpService.post(
      environment.baseUrl + "account/register",
      param,
      { headers: this.getAuthHeader() }
    );
  };

  private getAuthHeader = () => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
    });
    return headers;
  };

  getHeader = () => {
    return new HttpHeaders({
      "Content-Type": "application/x-www-form-urlencoded",
    });
  };
}
