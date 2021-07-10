import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
@Injectable({
  providedIn: "root",
})
export class HttpService {
  AUTH_TOKEN = "auth_token";
  constructor(private httpClient: HttpClient) {}

  get(url: string, params?: any, headers?: any): Observable<any> {
    const data = { headers: headers };
    return this.httpClient
      .get(url, data)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  post(url: string, params?: any, headers?: any): Observable<any> {
    // const data = {params, headers: this.getAuthHeader()};
    return this.httpClient
      .post(url, params, headers)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  put(url: string, params?: any, headers?: any): Observable<any> {
    // const data = {params, headers: this.getAuthHeader()};
    return this.httpClient
      .put(url, params, headers)
      .pipe(catchError(this.errorHandler.bind(this)));
  }

  private errorHandler(response: any) {
    const error = response.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];
    if (response.status === 401) {
      // auth token delete
      // redirect login page
    }
    if (error[key] instanceof Array) {
      message = error[key][0];
    }
    if (key === "isTrusted") {
      // this will occur when not connected to internet
    } else {
      message = key + " : " + message;
    }
    // call snackbar and show error with message
    return throwError({ messages: message, error });
  }

  private getAuthHeader(): { [header: string]: string | string[] } {
    return {
      Authorization: `Bearer ${localStorage.getItem(this.AUTH_TOKEN)}`,
    };
  }
}
