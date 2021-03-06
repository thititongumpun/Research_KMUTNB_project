import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable  } from 'rxjs';
import { DatePipe } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  Get(url): Observable<any> {
    return this.http.get(this.baseUrl + url)
  }

  Filter(url): Observable<any> {
    return this.http.get(this.baseUrl + url)
  }

  Post(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, { headers: headers }, {})
  }

  PostNOSQL(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };

    let body = {
      "CUS_ID": 12345,
      "SHOP_ID": 55,
      "PRODUCTTYPE": "Computers" ,
      "phone": "123-555-555",
    }
    return this.http.post(this.baseUrl + url, body,{ headers: headers })
  }

  PostSQL(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    let body = {
      "CUS_ID": 123,
      "SHOP_ID": 55,
      "Active_Time_Log": new Date().toISOString,
      "Product_Type": "IPhone"
    }
    return this.http.post(this.baseUrl + url, body, { headers: headers })
  }

  PostSQLROW(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, {
      "CUS_ID": 123,
      "SHOP_ID": 45,
      "Active_Time_Log": new Date(),
      "Product_Type": "Computers"
    },{ headers: headers })
  }

  DeleteSQL(url): Observable<any> {
    return this.http.delete(this.baseUrl + url);
  }

  ClearSQL(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, {headers: headers});
  }

  ClearMongoDB(url): Observable<any> {
    const headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Access-Control-Allow-Origin': '*' };
    return this.http.post(this.baseUrl + url, { headers: headers });
  }

}