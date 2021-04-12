import { HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpService } from "./http.service";
@Injectable({
  providedIn: "root",
})
export class AppService {
  baseUrl = environment.baseUrl;
  authUrl = environment.authUrl;
  constructor(private _httpService: HttpService) {}

  getAllProducts = () => {
    // return this._httpService.get(environment.authUrl + 'Product','',  this.getAuthHeader());
    return this._httpService.get("https://api.mocki.io/v1/32dcb2df");
  };
  private getAuthHeader = () => {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("AUTH_TOKEN")}`,
    });
    return headers;
  };

  /**
   * Validate Unique Id
   */
  validateUniqueId = (id: any) => {
    return this._httpService.get(
      environment.authUrl + "Seller/ValidateUniqueId",
      id,
      this.getAuthHeader()
    );
  };

  /**
   * Upload Banner Image
   */
  uploadBannerImage = (payload: any) => {
    return this._httpService.post(
      environment.authUrl + "FileLoad/UploadBannerImage",
      payload,
      { headers: this.getAuthHeader() }
    );
  };

  /**
   * Upload Profile Image
   */
  uploadProfileImage = (payload: any) => {
    return this._httpService.post(
      environment.authUrl + "FileLoad/UploadProfileImage",
      payload,
      { headers: this.getAuthHeader() }
    );
  };
}
