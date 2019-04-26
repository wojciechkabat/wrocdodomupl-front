import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Constants } from "../constants";
import { Observable } from "rxjs/internal/Observable";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url: string = Constants.API_ENDPOINT;

  constructor(public http: HttpClient) {
  }

  get<T>(endpoint: string, params?: any): Observable<T> {
    let requestParams = new HttpParams();

    for (let k in params) {
      requestParams = requestParams.set(k, params[k]);
    }

    return this.http.get<T>(this.url + '/' + endpoint, {params: requestParams, responseType: 'json'});
  }

  post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(this.url + '/' + endpoint, body, {headers: headers, responseType: 'json'});
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.http.put<T>(this.url + '/' + endpoint, body, {responseType: 'json'});
  }

  deleteHttp<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(this.url + '/' + endpoint, {responseType: 'json'});
  }

  postExternal<T>(endpointAddress: string, body: any, headers?: HttpHeaders): Observable<T> {
    return this.http.post<T>(endpointAddress, body, {headers: headers, responseType: 'json'});
  }
}
