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
    return this._httpService.get(
      environment.authUrl + "Product",
      "",
      this.getAuthHeader()
    );
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
    return this._httpService.post(
      environment.authUrl + "Seller/ValidateUniqueId",
      id,
      { headers: this.getAuthHeader() }
    );
  };

  /**
   * Add Product Image
   */
  addProduct = (id: any) => {
    return this._httpService.post(environment.authUrl + "Product", id, {
      headers: this.getAuthHeader(),
    });
  };
  /**
   * Uplaod Product Image
   */
  uploadProducImage = (payload: any) => {
    return this._httpService.post(
      environment.authUrl + "FileLoad/UploadProductImage",
      payload,
      { headers: this.getAuthHeader() }
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

  /**
   * Get Seller Details
   */
  getSellerDetails = () => {
    return this._httpService.get(
      environment.authUrl + "Seller",
      "",
      this.getAuthHeader()
    );
  };

  /***
   * Publish Product
   */
  publishProduct = (payload: any) => {
    return this._httpService.put(
      environment.authUrl + "product/PublishProduct",
      payload,
      { headers: this.getAuthHeader() }
    );
  };

  /**
   * Get Product Deatils
   */
  getProductCategory = () => {
    return this._httpService.get(
      environment.authUrl + "ProductCategory",
      "",
      this.getAuthHeader()
    );
  };

  /***
   * Get new Order
   */
  getNewOrder = () => {
    return this._httpService.get(
      environment.authUrl + "Seller/GetNewOrders",
      "",
      this.getAuthHeader()
    );
  };

  /**
   * Get order status
   */
  getAllOrderStatus = () => {
    return this._httpService.get(
      environment.authUrl + "Order/GetAllOrderStatus",
      "",
      this.getAuthHeader()
    );
  };

  /**
   * Get Order details
   */
  getOrderDetails = (payload: any) => {
    return this._httpService.post(
      environment.authUrl + "Order/GetOrderDetails",
      payload,
      { headers: this.getAuthHeader() }
    );
  };
}
